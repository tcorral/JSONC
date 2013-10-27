describe('JSONC API', function ()
{
  it('should check that JSONC exist in Namespace', function ()
  {
    expect( Namespace.JSONC ).not.toBeUndefined();
  });
  it('should check that JSONC has a compress method', function ()
  {
    expect(typeof Namespace.JSONC.compress === 'function').toBeTruthy();
  });
  it('should check that JSONC has a decompress method', function ()
  {
    expect(typeof Namespace.JSONC.decompress === 'function').toBeTruthy();
  });
});
describe('JSONC.compress', function (){
  it('should check that returns that we expected', function(){
    var original = [{
        'test': 'result'
      }],
      expected = [{
        _: {"A":'test'},
        A: 'result'
      }],
      retrieved;

    retrieved = Namespace.JSONC.compress( original );

    expect(retrieved).toEqual(expected);
  });
  it('should check that returns that we expected', function ()
  {
    var original = {
        'test': 'result'
      },
      expected = {
        _: {"A":'test'},
        A: 'result'
      },
      retrieved;

    retrieved = Namespace.JSONC.compress( original );

    expect(retrieved).toEqual(expected);
  });
  it('should check that returns that we expected', function ()
  {
    var original = {
        'test': 'result',
        'test1': 'result',
        'test2': 'result',
        'test3': 'result',
        'test4': 'result',
        'test5': 'result',
        'test6': 'result',
        'test7': 'result',
        'test8': 'result',
        'test9': 'result',
        'test10': 'result',
        'test11': 'result',
        'test12': 'result',
        'test13': 'result',
        'test14': 'result',
        'test15': 'result',
        'test16': 'result',
        'test17': 'result',
        'test18': 'result',
        'test19': 'result',
        'test20': 'result',
        'test21': 'result',
        'test22': 'result',
        'test23': 'result',
        'test24': 'result',
        'test25': 'result',
        'test26': 'result',
        'test27': 'result'
      },
      expected = {
        _: {
          "A":'test',
          "B":'test1',
          "C":'test2',
          "D":'test3',
          "E":'test4',
          "F":'test5',
          "G":'test6',
          "H":'test7',
          "I":'test8',
          "J":'test9',
          "K":'test10',
          "L":'test11',
          "M":'test12',
          "N":'test13',
          "O":'test14',
          "P":'test15',
          "Q":'test16',
          "R":'test17',
          "S":'test18',
          "T":'test19',
          "U":'test20',
          "V":'test21',
          "W":'test22',
          "X":'test23',
          "Y":'test24',
          "Z":'test25',
          "AA":'test26',
          "AB":'test27'
        },
        "A":'result',
        "B":'result',
        "C":'result',
        "D":'result',
        "E":'result',
        "F":'result',
        "G":'result',
        "H":'result',
        "I":'result',
        "J":'result',
        "K":'result',
        "L":'result',
        "M":'result',
        "N":'result',
        "O":'result',
        "P":'result',
        "Q":'result',
        "R":'result',
        "S":'result',
        "T":'result',
        "U":'result',
        "V":'result',
        "W":'result',
        "X":'result',
        "Y":'result',
        "Z":'result',
        "AA":'result',
        "AB":'result'
      },
      retrieved;

    retrieved = Namespace.JSONC.compress( original );

    expect(retrieved).toEqual(expected);
  });
  it('should check that returns that we expected', function ()
  {
    var original = {
        'data': [
          {
            'test': 1,
            'test2': [2,3],
            'test3': 3
          },
          {
            'test': 4,
            'test2': 5,
            'test3': 6
          }
        ]
      },
      expected = {
        _: {"A":'test', "B":'test2', "C":'test3', "D":'data'},
        D: [
          {
            'A':1,
            'B':[2,3],
            'C':3
          },
          {
            'A':4,
            'B':5,
            'C':6
          }
        ]
      },
      retrieved;

    retrieved = Namespace.JSONC.compress( original );

    expect(retrieved).toEqual(expected);
  });
});
describe('JSONC.decompress', function (){
  it('should check that returns that we expected', function ()
  {
    var expected = [{
        'test': 'result'
      }],
      original = [{
        _: {"A":'test'},
        A: 'result'
      }],
      retrieved;

    retrieved = Namespace.JSONC.decompress( original );

    expect(retrieved).toEqual(expected);
  });
  it('should check that returns that we expected', function ()
  {
    var expected = {
        'test': 'result'
      },
      original = {
        _: {"A":'test'},
        A: 'result'
      },
      retrieved;

    retrieved = Namespace.JSONC.decompress( original );

    expect(retrieved).toEqual(expected);
  });
  it('should check that returns that we expected as array', function ()
  {
    var expected = {
        'data': [
          {
            'test': 1,
            'test2': 2,
            'test3': 3
          },
          {
            'test': 4,
            'test2': 5,
            'test3': 6
          }
        ]
      },
      original = {
        _: {"A":'test', "B":'test2', "C":'test3', "D":'data'},
        D: [
          {
            'A':1,
            'B':2,
            'C':3
          },
          {
            'A':4,
            'B':5,
            'C':6
          }
        ]
      },
      retrieved;

    retrieved = Namespace.JSONC.decompress( original );

    expect(retrieved).toEqual(expected);
  });
});