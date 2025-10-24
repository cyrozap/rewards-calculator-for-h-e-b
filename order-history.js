// SPDX-License-Identifier: 0BSD

/*
 * Copyright (C) 2025 by Forest Crossman <cyrozap@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for
 * any purpose with or without fee is hereby granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL
 * WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
 * AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL
 * DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
 * PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
 * TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */


(function () {
  "use strict";

  function getFinalPrice() {
    // NOTE: "esitmatedTotalValue" is deliberately misspelled because it's misspelled this way in the page source.
    // THIS IS NOT A BUG! DO NOT ATTEMPT TO CORRECT THE SPELLING!
    const totalElement = document.querySelector('div[data-qe-id="esitmatedTotalValue"]');
    if (!totalElement) return 0;
    return parsePrice(totalElement.textContent);
  }

  function displayResults(hebPrice, nonHEBPrice, rewardsValue, effectivePercentage) {
    const summary = document.querySelector('div[data-qe-id="orderSummaryCard"]');
    if (!summary) return;

    const summaryList = summary.querySelector('div');
    if (!summaryList) return;

    const createListItem = (label, value) => {
      const el = document.createElement("div");
      const div = document.createElement("div");
      const span = document.createElement("span");

      const labelSpan = document.createElement("span");
      labelSpan.textContent = label;

      const valueSpan = document.createElement("span");
      valueSpan.textContent = value;

      const firstListItem = summaryList.querySelector("div");
      if (firstListItem) {
        const firstDiv = firstListItem.querySelector("div");
        const firstSpan = firstListItem.querySelector("span");
        const firstLabelSpan = firstSpan.querySelector("span");
        const firstValueSpan = firstSpan.querySelector("span + span");

        if (firstDiv) div.className = firstDiv.className;
        if (firstSpan) span.className = firstSpan.className;
        if (firstLabelSpan) labelSpan.className = firstLabelSpan.className;
        if (firstValueSpan) valueSpan.className = firstValueSpan.className;
      }

      span.appendChild(labelSpan);
      span.appendChild(valueSpan);
      div.appendChild(span);
      el.appendChild(div);

      return el;
    };

    const estimatedTotalItem = summaryList.querySelector(
      'h3[data-testid="total"]'
    );
    if (estimatedTotalItem) {
      const effectiveItem = createListItem(
        "Effective Rewards Percentage:",
        `${effectivePercentage.toFixed(2)}%`
      );
      const rewardsItem = createListItem("Rewards Value:", `$${rewardsValue.toFixed(2)}`);
      const nonHEBItem = createListItem("Non-H-E-B Items:", `$${nonHEBPrice.toFixed(2)}`);
      const hebItem = createListItem("H-E-B Items:", `$${hebPrice.toFixed(2)}`);

      estimatedTotalItem.insertAdjacentElement("afterend", effectiveItem);
      estimatedTotalItem.insertAdjacentElement("afterend", rewardsItem);
      estimatedTotalItem.insertAdjacentElement("afterend", nonHEBItem);
      estimatedTotalItem.insertAdjacentElement("afterend", hebItem);

      return {
        effectiveItem,
        rewardsItem,
        nonHEBItem,
        hebItem
      };
    }
    return {};
  }

  function run() {
    const observer = new MutationObserver((_mutations, obs) => {
      const items = document.querySelectorAll('a[data-qe-id="itemRowDetailsName"]');
      if (items.length > 0) {
        obs.disconnect();
        const hebItems = [];
        const nonHEBItems = [];

        items.forEach(item => {
          const productName = item.textContent.trim();
          const priceElement = item.closest('.order-row-details').querySelector('span[data-qe-id="checkoutItemPrice"]');
          if (!priceElement) return;

          const price = parsePrice(priceElement.textContent);
          if (isHEBBrand(productName)) {
            hebItems.push(price);
          } else {
            nonHEBItems.push(price);
          }
        });

        // Extract delivery fee, tax, and driver tip
        const deliveryFeeElement = document.querySelector('span[data-qe-id="DeliveryfeetotalFee"]');
        const taxElement = document.querySelector('span[data-qe-id="Tax total"]');
        const driverTipElement = document.querySelector('span[data-qe-id="Driver tip total"]');

        if (deliveryFeeElement) {
          nonHEBItems.push(parsePrice(deliveryFeeElement.textContent));
        }
        if (taxElement) {
          nonHEBItems.push(parsePrice(taxElement.textContent));
        }
        if (driverTipElement) {
          nonHEBItems.push(parsePrice(driverTipElement.textContent));
        }

        const totalPrice = getFinalPrice();

        const { rewardsValue, effectivePercentage } = calculateRewards(totalPrice, hebItems, nonHEBItems);

        const hebPrice = hebItems.reduce((sum, val) => sum + val, 0);
        const nonHEBPrice = nonHEBItems.reduce((sum, val) => sum + val, 0);

        const resultElements = displayResults(hebPrice, nonHEBPrice, rewardsValue, effectivePercentage);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
