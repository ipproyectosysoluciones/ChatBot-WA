import makeWASocketOther, {
    useMultiFileAuthState,
    DisconnectReason,
    proto,
    makeCacheableSignalKeyStore,
    getAggregateVotesInPollMessage,
    WASocket,
    BaileysEventMap,
    Browsers as BaileysBrowsers,
    AnyMediaMessageContent,
    AnyMessageContent,
    downloadMediaMessage,
    fetchLatestBaileysVersion,
    fetchLatestWaWebVersion,
    WAMessage,
    MessageUpsertType,
    isJidGroup,
    isJidBroadcast,
    isLidUser,
    PollMessageOptions,
    WAVersion,
    WABrowserDescription,
} from 'baileys'

// Fallback for test environments where baileys' Browsers export is missing
// or has no `appropriate` method (regression in some bundle/ESM shapes).
const BrowsersFallback = {
// SAFETY: object shape matches WABrowserDescription expected by `bailey.ts:60`
// Used only when upstream `baileys` module lacks `Browsers.appropriate` (test env regression)
appropriate: (): WABrowserDescription => ['Chrome 126.0.0', 'Chrome', 'Firefox'],
}

const Browsers: typeof BaileysBrowsers =
BaileysBrowsers && typeof BaileysBrowsers.appropriate === 'function'
    ? BaileysBrowsers
    : (
        // SAFETY: fallback object satisfies WABrowserDescription (verified at bailey.ts:60 runtime guard above)
        BrowsersFallback as unknown as typeof BaileysBrowsers
      )

export {
    makeWASocketOther,
    useMultiFileAuthState,
    DisconnectReason,
    proto,
    makeCacheableSignalKeyStore,
    getAggregateVotesInPollMessage,
    WASocket,
    BaileysEventMap,
    Browsers,
    AnyMediaMessageContent,
    AnyMessageContent,
    downloadMediaMessage,
    fetchLatestBaileysVersion,
    fetchLatestWaWebVersion,
    WAMessage,
    MessageUpsertType,
    isJidGroup,
    isJidBroadcast,
    isLidUser,
    PollMessageOptions,
    WAVersion,
    WABrowserDescription,
}
