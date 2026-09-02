// Mock fallback for test environments where baileys Browsers may be undefined
// Fixes: provider-baileys tests fail with TypeError: Browsers.appropriate is undefined

try {
    const baileysModule = require('baileys')
    if (baileysModule && baileysModule.Browsers && !baileysModule.Browsers.appropriate) {
        baileysModule.Browsers.appropriate = () => ['Chrome 126.0.0', 'Chrome', 'Firefox']
    }
} catch {
    // Module not available in this test context; mock handled elsewhere
}
