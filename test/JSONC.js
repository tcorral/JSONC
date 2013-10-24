TestCase('JSONC API', {
  'test should check that JSONC exist in Namespace': function ()
  {
    assertNotUndefined( Namespace.JSONC );
  },
  'test should check that JSONC has a compress method': function ()
  {
    assertFunction( Namespace.JSONC.compress );
  },
  'test should check that JSONC has a decompress method': function ()
  {
    assertFunction( Namespace.JSONC.decompress );
  }
});

TestCase('JSONC.compress', {
  'test should check that returns ': function ()
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

      assertEquals( expected, retrieved );
  }
});

TestCase('JSONC.decompress', {
  'test should check that returns ': function ()
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

    assertEquals( expected, retrieved );
  }
});