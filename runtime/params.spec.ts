import { SkyAppRuntimeConfigParams } from './params';

describe('SkyAppRuntimeConfigParams', () => {

  const allowed = [
    'a1',
    'a3'
  ];

  it('should parse allowed params from a url', () => {
    const params: SkyAppRuntimeConfigParams = new SkyAppRuntimeConfigParams(
      'https://example.com/?a1=a&b2=jkl&a3=b',
      allowed
    );

    expect(params.getAllKeys()).toEqual(['a1', 'a3']);
    expect(params.get('a1')).toEqual('a');
    expect(params.get('b2')).not.toEqual('jkl');
    expect(params.get('a3')).toEqual('b');
    expect(params.getAll()).toEqual({
      a1: 'a',
      a3: 'b'
    });
  });

  it('should only let allowed params be set', () => {
    const params: SkyAppRuntimeConfigParams = new SkyAppRuntimeConfigParams(
      '?a1=b&b2=c',
      allowed
    );
    expect(params.get('a1')).toEqual('b');
    expect(params.get('b2')).not.toEqual('c');
  });

  it('should add the current params to a url with a querystring', () => {
    const params: SkyAppRuntimeConfigParams = new SkyAppRuntimeConfigParams(
      '?a1=b',
      allowed
    );
    expect(params.getUrl('https://mysite.com?c=d')).toEqual('https://mysite.com?c=d&a1=b');
  });

  it('should not add a current param if the url already has it', () => {
    const params: SkyAppRuntimeConfigParams = new SkyAppRuntimeConfigParams(
      '?a1=b',
      allowed
    );
    expect(params.getUrl('https://mysite.com?a1=c&a3=e')).toEqual('https://mysite.com?a1=c&a3=e');
  });

  it('should add the current params to a url without a querystring', () => {
    const params: SkyAppRuntimeConfigParams = new SkyAppRuntimeConfigParams(
      '?a1=b',
      allowed
    );
    expect(params.getUrl('https://mysite.com')).toEqual('https://mysite.com?a1=b');
  });

  it('should return the current url if no params set (do not add ?)', () => {
    const params: SkyAppRuntimeConfigParams = new SkyAppRuntimeConfigParams(
      '',
      allowed
    );
    expect(params.getUrl('https://mysite.com')).toEqual('https://mysite.com');
  });

  it('should allow querystring param keys to be case insensitive', () => {
    const params: SkyAppRuntimeConfigParams = new SkyAppRuntimeConfigParams(
      '?A1=b&A3=c',
      allowed
    );
    expect(params.get('a1')).toEqual('b');
    expect(params.get('a3')).toEqual('c');
  });

  it('should expose a `has` method for testing if a param exists', () => {
    const params: SkyAppRuntimeConfigParams = new SkyAppRuntimeConfigParams(
      '?a1=b&a2=c',
      allowed
    );
    expect(params.has('a1')).toEqual(true);
    expect(params.has('a2')).toEqual(false);
    expect(params.has('a3')).toEqual(false);
  });

});
