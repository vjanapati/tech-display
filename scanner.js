/*!
 * @undecaf/barcode-detector-polyfill v0.9.20
 * A WebAssembly polyfill for the Barcode Detection API
 * Built 2023-07-29T22:09:21.713Z
 * (c) 2021-present Ferdinand Kasper <fkasper@modus-operandi.at>
 * Released under the MIT license.
 * 
 * This work uses https://github.com/undecaf/zbar-wasm.git as per
 * LGPL-2.1 section 6 (https://opensource.org/licenses/LGPL-2.1).
 */
const barcodeDetectorPolyfill = function(e, t) {
    "use strict";
    /*! *****************************************************************************
        Copyright (c) Microsoft Corporation.

        Permission to use, copy, modify, and/or distribute this software for any
        purpose with or without fee is hereby granted.

        THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
        REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
        AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
        INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
        LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
        OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
        PERFORMANCE OF THIS SOFTWARE.
        ***************************************************************************** */
    function n(e, t, n, r) {
        return new(n || (n = Promise))((function(a, i) {
            function o(e) {
                try {
                    m(r.next(e))
                } catch (e) {
                    i(e)
                }
            }

            function s(e) {
                try {
                    m(r.throw(e))
                } catch (e) {
                    i(e)
                }
            }

            function m(e) {
                var t;
                e.done ? a(e.value) : (t = e.value, t instanceof n ? t : new n((function(e) {
                    e(t)
                }))).then(o, s)
            }
            m((r = r.apply(e, t || [])).next())
        }))
    }
    class r {
        constructor(e, n = t.ZBarConfigType.ZBAR_CFG_ENABLE, r = 1) {
            this.symbolType = e, this.configType = n, this.number = r, this.configSteps = [this]
        }
        static register(e, t, n = t.symbolType) {
            return r.formatsToConfigs[e] = t, r.typesToFormats[n] = r.typesToFormats[n] || e, t
        }
        static formats() {
            return Object.keys(r.formatsToConfigs)
        }
        static toFormat(e) {
            return r.typesToFormats[e]
        }
        static configure(e, t) {
            var n;
            null === (n = r.formatsToConfigs[t]) || void 0 === n || n.configSteps.forEach((t => e.setConfig(t.symbolType, t.configType, t.number)))
        }
        add(e) {
            return this.configSteps.push(e), this
        }
    }
    var a;
    r.formatsToConfigs = {}, r.typesToFormats = {}, r.register("codabar", new r(t.ZBarSymbolType.ZBAR_CODABAR)), r.register("code_39", new r(t.ZBarSymbolType.ZBAR_CODE39)), r.register("code_93", new r(t.ZBarSymbolType.ZBAR_CODE93)), r.register("code_128", new r(t.ZBarSymbolType.ZBAR_CODE128)), r.register("databar", new r(t.ZBarSymbolType.ZBAR_DATABAR)), r.register("databar_exp", new r(t.ZBarSymbolType.ZBAR_DATABAR_EXP)), r.register("ean_2", new r(t.ZBarSymbolType.ZBAR_EAN2)), r.register("ean_5", new r(t.ZBarSymbolType.ZBAR_EAN5)), r.register("ean_8", new r(t.ZBarSymbolType.ZBAR_EAN8)), r.register("ean_13", new r(t.ZBarSymbolType.ZBAR_EAN13)), r.register("ean_13+2", new r(t.ZBarSymbolType.ZBAR_EAN13)).add(new r(t.ZBarSymbolType.ZBAR_EAN2)), r.register("ean_13+5", new r(t.ZBarSymbolType.ZBAR_EAN13)).add(new r(t.ZBarSymbolType.ZBAR_EAN5)), r.register("isbn_10", new r(t.ZBarSymbolType.ZBAR_ISBN10)).add(new r(t.ZBarSymbolType.ZBAR_EAN13)), r.register("isbn_13", new r(t.ZBarSymbolType.ZBAR_ISBN13)).add(new r(t.ZBarSymbolType.ZBAR_EAN13)), r.register("isbn_13+2", new r(t.ZBarSymbolType.ZBAR_ISBN13)).add(new r(t.ZBarSymbolType.ZBAR_EAN13)).add(new r(t.ZBarSymbolType.ZBAR_EAN2)), r.register("isbn_13+5", new r(t.ZBarSymbolType.ZBAR_ISBN13)).add(new r(t.ZBarSymbolType.ZBAR_EAN13)).add(new r(t.ZBarSymbolType.ZBAR_EAN5)), r.register("itf", new r(t.ZBarSymbolType.ZBAR_I25)), r.register("qr_code", new r(t.ZBarSymbolType.ZBAR_QRCODE)), r.register("sq_code", new r(t.ZBarSymbolType.ZBAR_SQCODE)), r.register("upc_a", new r(t.ZBarSymbolType.ZBAR_UPCA)).add(new r(t.ZBarSymbolType.ZBAR_EAN13)), r.register("upc_e", new r(t.ZBarSymbolType.ZBAR_UPCE)).add(new r(t.ZBarSymbolType.ZBAR_EAN13)), e.Orientation = void 0, (a = e.Orientation || (e.Orientation = {}))[a.UNKNOWN = -1] = "UNKNOWN", a[a.UPRIGHT = 0] = "UPRIGHT", a[a.ROTATED_RIGHT = 1] = "ROTATED_RIGHT", a[a.UPSIDE_DOWN = 2] = "UPSIDE_DOWN", a[a.ROTATED_LEFT = 3] = "ROTATED_LEFT";
    class i {}
    const o = (() => {
        try {
            return new OffscreenCanvas(1, 1).getContext("2d") instanceof OffscreenCanvasRenderingContext2D
        } catch (e) {
            return !1
        }
    })();
    class s {
        constructor(e = {}) {
            if (void 0 !== e.formats) {
                if (!Array.isArray(e.formats) || !e.formats.length) throw new TypeError(`Barcode formats should be a non-empty array of strings but are: ${JSON.stringify(e)}`);
                const t = e.formats.filter((e => !r.formats().includes(e)));
                if (t.length) throw new TypeError(`Unsupported barcode format(s): ${t.join(", ")}`)
            }
            this.formats = e.formats || r.formats(), this.zbarConfig = e.zbar || new i
        }
        static getSupportedFormats() {
            return Promise.resolve(r.formats())
        }
        detect(e) {
            if (!s.isImageBitmapSource(e)) throw new TypeError("BarcodeDetector.detect() argument is not an ImageBitmapSource");
            const n = s.intrinsicDimensions(e);
            if (0 === n.width || 0 === n.height) return Promise.resolve([]);
            try {
                return Promise.all([this.toImageData(e), this.getScanner()]).then((e => {
                    const n = e[0],
                        r = e[1];
                    return void 0 !== this.zbarConfig.enableCache && r.enableCache(this.zbarConfig.enableCache), t.scanRGBABuffer(n.data, n.width, n.height, r)
                })).then((e => e.map((e => this.toBarcodeDetectorResult(e)))))
            } catch (e) {
                return Promise.reject(e)
            }
        }
        getScanner() {
            return new Promise(((e, a) => n(this, void 0, void 0, (function*() {
                if (!this.scanner) {
                    const e = yield t.getDefaultScanner();
                    this.formats.length > 0 && (e.setConfig(t.ZBarSymbolType.ZBAR_NONE, t.ZBarConfigType.ZBAR_CFG_ENABLE, 0), this.formats.forEach((t => r.configure(e, t)))), this.scanner = e
                }
                e(this.scanner)
            }))))
        }
        toImageData(e) {
            const t = e => {
                const t = s.intrinsicDimensions(e);
                this.canvas && this.canvas.width === t.width && this.canvas.height === t.height || (this.canvas = function(e, t) {
                    if (o) return new OffscreenCanvas(e, t);
                    {
                        const n = document.createElement("canvas");
                        return n.width = e, n.height = t, n
                    }
                }(t.width, t.height));
                const n = this.canvas,
                    r = n.getContext("2d");
                return r.drawImage(e, 0, 0), r.getImageData(0, 0, n.width, n.height)
            };
            if (e instanceof ImageData) return Promise.resolve(e);
            if (e instanceof Blob) {
                const n = document.createElement("img");
                return n.src = URL.createObjectURL(e), n.decode().then((() => t(n))).finally((() => URL.revokeObjectURL(n.src)))
            }
            return e instanceof CanvasRenderingContext2D ? Promise.resolve(e.getImageData(0, 0, e.canvas.width, e.canvas.height)) : Promise.resolve(t(e))
        }
        toBarcodeDetectorResult(e) {
            const t = {
                minX: 1 / 0,
                maxX: -1 / 0,
                minY: 1 / 0,
                maxY: -1 / 0
            };
            e.points.forEach((e => {
                t.minX = Math.min(t.minX, e.x), t.maxX = Math.max(t.maxX, e.x), t.minY = Math.min(t.minY, e.y), t.maxY = Math.max(t.maxY, e.y)
            }));
            return {
                format: r.toFormat(e.type),
                rawValue: e.decode(this.zbarConfig.encoding),
                orientation: e.orientation,
                quality: e.quality,
                boundingBox: DOMRectReadOnly.fromRect({
                    x: t.minX,
                    y: t.minY,
                    width: t.maxX - t.minX,
                    height: t.maxY - t.minY
                }),
                cornerPoints: [{
                    x: t.minX,
                    y: t.minY
                }, {
                    x: t.maxX,
                    y: t.minY
                }, {
                    x: t.maxX,
                    y: t.maxY
                }, {
                    x: t.minX,
                    y: t.maxY
                }]
            }
        }
        static isImageBitmapSource(e) {
            return e instanceof HTMLImageElement || e instanceof HTMLVideoElement || e instanceof HTMLCanvasElement || e instanceof Blob || e instanceof ImageData || e instanceof CanvasRenderingContext2D || e instanceof ImageBitmap || e && 0 == e.width || e && 0 == e.height
        }
        static intrinsicDimensions(e) {
            return {
                width: Number(e.naturalWidth || e.videoWidth || e.width),
                height: Number(e.naturalHeight || e.videoHeight || e.height)
            }
        }
    }
    return e.BarcodeDetectorPolyfill = s, e.ZBAR_WASM_PKG_NAME = "@undecaf/zbar-wasm", e.ZBAR_WASM_REPOSITORY = "https://cdn.jsdelivr.net/npm/@undecaf/zbar-wasm@0.9.15", e.ZBAR_WASM_VERSION = "0.9.15", e.ZBarConfig = i, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e
}({}, zbarWasm);
//# sourceMappingURL=index.js.map// This is just a sample script. Paste your real code (javascript or HTML) here.

if ('this_is' == /an_example/) {
    of_beautifier();
} else {
    var a = b ? (c % d) : e[f];
}
