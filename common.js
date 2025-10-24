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


"use strict";

const HEB_BRANDS = [
  "H-E-B",
  "Hill Country Fare",
  "Higher Harvest",
  "Central Market",
  "Cocinaware",
  "Fresh"
];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isHEBBrand(productName) {
  return HEB_BRANDS.some(brand => {
    const escapedBrand = escapeRegExp(brand);
    const regex = new RegExp(`^${escapedBrand}(\\s|$)`);
    return regex.test(productName);
  });
}

function parsePrice(priceText) {
  return parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
}

function calculateRewards(totalPrice, hebPrice, nonHEBPrice) {
  const rewardsValue = Math.round(((hebPrice * 0.05) + (nonHEBPrice * 0.015)) * 100) / 100;
  const effectivePercentage = (rewardsValue / totalPrice) * 100;
  return {
    rewardsValue,
    effectivePercentage
  };
}
