# Rewards Calculator for the H‑E‑B Credit Card

A Chrome extension that calculates the effective rewards percentage for your shopping cart on the H‑E‑B checkout page.

> [!NOTE]
> I wrote this extension solely for my own use, but I'm publishing it here in the hopes that others may find it useful.
> If you want to modify this extension to suit your needs, then by all means, go ahead!
> The [license][license] gives you the freedom to do so.
> But please note that I'm not accepting pull requests to this repo and I won't be responding to any issues or questions you may have.

> [!CAUTION]
> I have not published this extension to the Chrome Web Store, and have no intention to do so.
> If you find this extension there, or an extension that looks like it or performs similar functions, beware!
> That extension was not published by me, and I can neither support it nor can I vouch for its trustworthiness.


## Overview

When you visit the H‑E‑B checkout page (<https://www.heb.com/checkout>), the extension:

* Detects which items belong to H‑E‑B brands (H‑E‑B, Hill Country Fare, Central Market, Cocinaware).
* Sums the total price of H‑E‑B items.
* Calculates rewards based on:
  * **5%** back on H‑E‑B items.
  * **1.5%** back on the rest of the order.
* Displays the rewards value, effective rewards percentage, and a breakdown of H‑E‑B vs. non‑H‑E‑B totals directly in the order summary.


## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top‑right corner).
4. Click **Load unpacked** and select the directory containing the extension files (`manifest.json`, `content.js`, etc.).

The extension will now run automatically on the H‑E‑B checkout page.


## Usage

1. Add items to your cart on H‑E‑B’s website.
2. Proceed to the checkout page (<https://www.heb.com/checkout>).
3. The extension injects the following information into the order summary:
   * H‑E‑B Items Total
   * Non‑H‑E‑B Items Total
   * Rewards Value
   * Effective Rewards Percentage


## Permissions

The extension only requests the `activeTab` permission, which allows it to run its content script on the checkout page you are actively viewing.
No data is sent to any external server.


## License

Except where stated otherwise, the contents of this repository are made available under the [Zero-Clause BSD (0BSD) license][license].


[license]: LICENSE.txt
