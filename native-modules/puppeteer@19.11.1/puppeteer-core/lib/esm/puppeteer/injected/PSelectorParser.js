/**
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { tokenize, TOKENS, stringify } from 'parsel-js';
TOKENS['combinator'] = /\s*(>>>>?|[\s>+~])\s*/g;
const ESCAPE_REGEXP = /\\[\s\S]/g;
const unquote = (text) => {
    if (text.length > 1) {
        for (const char of ['"', "'"]) {
            if (!text.startsWith(char) || !text.endsWith(char)) {
                continue;
            }
            return text
                .slice(char.length, -char.length)
                .replace(ESCAPE_REGEXP, match => {
                return match.slice(1);
            });
        }
    }
    return text;
};
export function parsePSelectors(selector) {
    var _a;
    let isPureCSS = true;
    const tokens = tokenize(selector);
    if (tokens.length === 0) {
        return [[], isPureCSS];
    }
    let compoundSelector = [];
    let complexSelector = [compoundSelector];
    const selectors = [complexSelector];
    const storage = [];
    for (const token of tokens) {
        switch (token.type) {
            case 'combinator':
                switch (token.content) {
                    case ">>>" /* PCombinator.Descendent */:
                        isPureCSS = false;
                        if (storage.length) {
                            compoundSelector.push(stringify(storage));
                            storage.splice(0);
                        }
                        compoundSelector = [];
                        complexSelector.push(">>>" /* PCombinator.Descendent */);
                        complexSelector.push(compoundSelector);
                        continue;
                    case ">>>>" /* PCombinator.Child */:
                        isPureCSS = false;
                        if (storage.length) {
                            compoundSelector.push(stringify(storage));
                            storage.splice(0);
                        }
                        compoundSelector = [];
                        complexSelector.push(">>>>" /* PCombinator.Child */);
                        complexSelector.push(compoundSelector);
                        continue;
                }
                break;
            case 'pseudo-element':
                if (!token.name.startsWith('-p-')) {
                    break;
                }
                isPureCSS = false;
                if (storage.length) {
                    compoundSelector.push(stringify(storage));
                    storage.splice(0);
                }
                compoundSelector.push({
                    name: token.name.slice(3),
                    value: unquote((_a = token.argument) !== null && _a !== void 0 ? _a : ''),
                });
                continue;
            case 'comma':
                if (storage.length) {
                    compoundSelector.push(stringify(storage));
                    storage.splice(0);
                }
                compoundSelector = [];
                complexSelector = [compoundSelector];
                selectors.push(complexSelector);
                continue;
        }
        storage.push(token);
    }
    if (storage.length) {
        compoundSelector.push(stringify(storage));
    }
    return [selectors, isPureCSS];
}
//# sourceMappingURL=PSelectorParser.js.map