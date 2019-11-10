const {expect} = require('chai')
const {emailValidator, passwordValidator} = require('./validators')

describe('email validator', () => {
  it('is a function', () => {
    expect(emailValidator).to.be.a('function')
  })
  it('returns a boolean', () => {
    expect(emailValidator('')).is.a('boolean')
  })
  it('returns false if input does not contain an at sign (@)', () => {
    expect(emailValidator('randomstring')).deep.equals(false)
  })
  it(
    'returns false if an domArr is an array of length less than two -- ' +
      'in other words, must have a period',
    () => {
      expect(emailValidator('cody@emailcom')).deep.equals(false)
      expect(emailValidator('cody@')).deep.equals(false)
    }
  )
  it('returns true for valid email address', () => {
    expect(emailValidator('cody@email.com')).deep.equals(true)
    // this next test is just to view some console logs since I have no idea
    // how to test for internal variables... probably the first of many...
    // on the other hand if any of these tests fail as the function is being
    // written, it's a good indication that something went wrong
    expect(emailValidator('cody@pug.dogs.email.com')).deep.equals(true)
  })
  it('returns false if TLD (last element of domainArr) is numeric', () => {
    expect(emailValidator('cody@email.123')).deep.equals(false)
  })
  it('returns false if length of local part is not between 0 and 64 exclusively', () => {
    expect(
      emailValidator(
        'codycodycodycodycodycodycodycodycodycodycodycodycodycodycodycocycody' +
          '@email.com'
      )
    ).deep.equals(false)
    expect(emailValidator('@email.com')).deep.equals(false)
  })
  it('fails if length of domain part is not between 2 and 256 exclusively', () => {
    expect(
      emailValidator(
        'cody@emailemailemailemailemailemailemailemailemai' +
          'lemailemailemailemailemailemailemailemailemailemailemailemailemail' +
          'emailemailemailemailemailemailemailemailemailemailemailemailemaile' +
          'mailemailemailemailemailemailemailemailemailemailemailemailemailem' +
          'ailemailemailemailemailemailemailemailemailemailemailemailemailema' +
          'ilemailemailemail.com'
      )
    ).deep.equals(false)
    expect(emailValidator('cody@.c')).deep.equals(false)
    expect(emailValidator('cody@')).deep.equals(false)
  })
  it('fails if length of any DNS label is not between 0 and 64 exclusively', () => {
    expect(emailValidator('cody@my..email.com')).deep.equals(false)
    expect(emailValidator('cody@my.email.address.com')).deep.equals(true)
  })
  it('fails if local part contains an invalid character', () => {
    expect(emailValidator('c()dy@email.com')).deep.equals(false)
    // the next charCode is a backslash
    expect(
      emailValidator('cody' + String.fromCharCode(92) + '@email.com')
    ).deep.equals(false)
  })
  it('fails if local part begins or ends with a period', () => {
    expect(emailValidator('.cody@email.com')).deep.equals(false)
    expect(emailValidator('cody.@email.com')).deep.equals(false)
    expect(emailValidator('cody.pug@email.com')).deep.equals(true)
  })
  it('fails if local part contains consecutive periods', () => {
    expect(emailValidator('cody......pug@email.com')).deep.equals(false)
    expect(emailValidator('cody..p@email.com')).deep.equals(false)
  })
  it('fails if any DNS labels contain an invalid character', () => {
    expect(emailValidator('cody@email.c*m')).deep.equals(false)
    expect(emailValidator('cody@em&il.com')).deep.equals(false)
  })
  it('fails if any DNS labels start or end with a hyphen', () => {
    expect(emailValidator('cody@-email.com')).deep.equals(false)
    expect(emailValidator('cody@email.com-')).deep.equals(false)
  })
})

describe('password validator', () => {
  it('is a function: ', () => {
    expect(passwordValidator).to.be.a('function')
  })
  it('returns a boolean: ', () => {
    expect(passwordValidator('', '')).is.a('boolean')
  })
  it('returns false if password is not between 8 and 16 characters, inclusively', () => {
    expect(passwordValidator('hello', 'cody@email.com')).deep.equals(false)
    expect(
      passwordValidator('hellotheremynameiscodyiamapug', 'cody@email.com')
    ).deep.equals(false)
  })
  it('returns false if password does not contain a numeric digit', () => {
    expect(passwordValidator('andysokotwelve', 'c@g.com')).deep.equals(false)
    expect(passwordValidator('andysoko12', 'c@g.com')).deep.equals(true)
  })
})
