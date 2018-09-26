const cnpj = require('../index')

describe('CNPJ', () => {
  it('blacklists common numbers', () => {
    expect(cnpj.isValid('00000000000000')).to.equal(false)
    expect(cnpj.isValid('11111111111111')).to.equal(false)
    expect(cnpj.isValid('22222222222222')).to.equal(false)
    expect(cnpj.isValid('33333333333333')).to.equal(false)
    expect(cnpj.isValid('44444444444444')).to.equal(false)
    expect(cnpj.isValid('55555555555555')).to.equal(false)
    expect(cnpj.isValid('66666666666666')).to.equal(false)
    expect(cnpj.isValid('77777777777777')).to.equal(false)
    expect(cnpj.isValid('88888888888888')).to.equal(false)
    expect(cnpj.isValid('99999999999999')).to.equal(false)
  })

  it('rejects falsy values', () => {
    expect(cnpj.isValid('')).to.equal(false)
    expect(cnpj.isValid(null)).to.equal(false)
    expect(cnpj.isValid(undefined)).to.equal(false)
  })

  it('validates formatted strings', () => {
    expect(cnpj.isValid('54.550.752/0001-55')).to.equal(true)
  })

  it('validates unformatted strings', () => {
    expect(cnpj.isValid('54550752000155')).to.equal(true)
  })

  it('validates messed strings', () => {
    expect(cnpj.isValid('54550[752#0001..$55')).to.equal(true)
  })

  it('strictly validates strings', () => {
    expect(cnpj.isValid('54550[752#0001..$55', true)).to.equal(false)
    expect(cnpj.isValid('54.550.752/0001-55', true)).to.equal(true)
    expect(cnpj.isValid('54550752000155', true)).to.equal(true)
  })

  it('returns stripped number', () => {
    var number = cnpj.strip('54550[752#0001..$55')
    expect(number).to.eql('54550752000155')
  })

  it('returns formatted number', () => {
    var number = cnpj.format('54550752000155')
    expect(number).to.eql('54.550.752/0001-55')
  })

  it('generates formatted number', () => {
    var number = cnpj.generate(true)

    expect(number).to.match(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/)
    expect(cnpj.isValid(number)).to.equal(true)
  })

  it('generates unformatted number', () => {
    var number = cnpj.generate()

    expect(number).to.match(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/)
    expect(cnpj.isValid(number)).to.equal(true)
  })
})
