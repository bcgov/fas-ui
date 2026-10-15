import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { usePayLink } from '~/composables/usePayLink'

const { payApi, fetchSpy } = vi.hoisted(() => ({ payApi: vi.fn(), fetchSpy: vi.fn() }))

mockNuxtImport('useNuxtApp', () => () => ({ $payApi: payApi }) as unknown as ReturnType<typeof useNuxtApp>)
mockNuxtImport('useRuntimeConfig', () => () => ({
  public: { payApiUrl: 'https://pay.test/', payApiVersion: 'api/v1', appName: 'express', xApiKey: 'key-1' }
}) as unknown as ReturnType<typeof useRuntimeConfig>)

describe('usePayLink.getInvoiceByToken', () => {
  beforeEach(() => {
    vi.stubGlobal('$fetch', fetchSpy)
    payApi.mockReset()
    fetchSpy.mockReset()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('uses $payApi when signed in', async () => {
    payApi.mockResolvedValueOnce({ id: 1 })

    const result = await usePayLink().getInvoiceByToken('tok-1')

    expect(result).toEqual({ id: 1 })
    expect(payApi).toHaveBeenCalledWith('/payment-links/tok-1', { method: 'GET' })
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('sends only app headers (no Authorization) when anonymous', async () => {
    fetchSpy.mockResolvedValueOnce({ id: 2 })

    const result = await usePayLink().getInvoiceByToken('tok-2', { anonymous: true })

    expect(result).toEqual({ id: 2 })
    expect(payApi).not.toHaveBeenCalled()
    const [url, opts] = fetchSpy.mock.calls[0]!
    expect(url).toBe('/payment-links/tok-2')
    expect(opts.baseURL).toBe('https://pay.test/api/v1')
    expect(opts.headers).toEqual({ 'App-Name': 'express', 'X-Apikey': 'key-1' })
    expect(opts.headers).not.toHaveProperty('Authorization')
  })
})
