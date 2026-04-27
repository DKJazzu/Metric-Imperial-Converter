const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('Correctly read a whole number input', function() {
    assert.equal(convertHandler.getNum('32L'), 32);
  });

  test('Correctly read a decimal number input', function() {
    assert.equal(convertHandler.getNum('3.2mi'), 3.2);
  });

  test('Correctly read a fractional input', function() {
    assert.equal(convertHandler.getNum('3/2km'), 1.5);
  });

  test('Correctly read a fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum('3.5/7kg'), 0.5);
  });

  test('Return error on a double-fraction', function() {
    assert.isNull(convertHandler.getNum('3/2/3kg'));
  });

  test('Default to 1 when no numerical input provided', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('Correctly read each valid input unit', function() {
    const units = ['gal','L','mi','km','lbs','kg'];
    units.forEach(u => assert.equal(convertHandler.getUnit('3'+u), u));
  });

  test('Return error for an invalid input unit', function() {
    assert.isNull(convertHandler.getUnit('32g'));
  });

  test('Return the correct return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });

  test('Correctly return the spelled-out string unit', function() {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('Correctly convert gal to L', function() {
    assert.approximately(convertHandler.convert(1,'gal'), 3.78541, 0.1);
  });

  test('Correctly convert L to gal', function() {
    assert.approximately(convertHandler.convert(1,'L'), 0.26417, 0.1);
  });

  test('Correctly convert mi to km', function() {
    assert.approximately(convertHandler.convert(1,'mi'), 1.60934, 0.1);
  });

  test('Correctly convert km to mi', function() {
    assert.approximately(convertHandler.convert(1,'km'), 0.62137, 0.1);
  });

  test('Correctly convert lbs to kg', function() {
    assert.approximately(convertHandler.convert(1,'lbs'), 0.45359, 0.1);
  });

  test('Correctly convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1,'kg'), 2.20462, 0.1);
  });
});