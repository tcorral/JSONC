(function(ns)
{

  var JSONC = {},
      _nCode = -1,
      toString = {}.toString;

  function contains( arr, v )
  {
    var nIndex,
      nLen = arr.length;
    for ( nIndex = 0; nIndex < nLen; nIndex++ )
    {
      if ( arr[nIndex][1] === v )
      {
        return true;
      }
    }
    return false;
  }

  function unique( oldArray ) {
    var nIndex,
      nLen = oldArray.length,
      aArr = [];
    for ( nIndex = 0; nIndex < nLen; nIndex++)
    {
      if ( !contains( aArr, oldArray[nIndex][1] ) ) {
        aArr.push( oldArray[nIndex] );
      }
    }
    return aArr;
  }
  function escapeRegExp( text )
  {
    return text.replace( /[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&' );
  }
  function _isObject ( obj )
  {
    return toString.call( obj ) === '[object Object]';
  }
  function _isArray ( obj )
  {
    return toString.call( obj ) === '[object Array]';
  }
  function biDimensionalArrayToObject( aArr )
  {
    var obj = {},
        nIndex,
        nLen = aArr.length,
        oItem;
    for( nIndex = 0; nIndex < nLen; nIndex++ )
    {
      oItem = aArr[nIndex];
      obj[oItem[0]] = oItem[1];
    }
    return obj;
  }
  function _numberToKey ( index, totalChar, offset ){
    var aArr = [],
      currentChar = index;
    totalChar = totalChar || 26;
    offset = offset || 65;
    while( currentChar >= totalChar )
    {
      aArr.push( (currentChar % totalChar) + offset );
      currentChar = Math.floor( currentChar / totalChar - 1 );
    }
    aArr.push(currentChar + offset);
    return aArr.reverse();
  }
  function _getSpecialKey ( aKeys )
  {
    return String.fromCharCode.apply(String, aKeys);
  }
  function _getKeys ( json, aKeys )
  {
    var aKey,
      sKey,
      oItem;

    for ( sKey in json )
    {

      if ( json.hasOwnProperty( sKey ) )
      {
        oItem = json[sKey];
        if ( _isObject( oItem ) || _isArray( oItem ) )
        {
          aKeys = aKeys.concat( unique( _getKeys( oItem, aKeys) ) );
        }
        if ( isNaN( Number( sKey ) ) )
        {
          if ( !contains( aKeys, sKey ) )
          {
            _nCode += 1;
            aKey = [];
            aKey.push( _getSpecialKey( _numberToKey( _nCode ) ), sKey );
            aKeys.push( aKey );
          }
        }
      }
    }
    return aKeys;
  }
  function compressArray( json, aKeys )
  {
    var nIndex,
        nLenKeys;

    for ( nIndex = 0, nLenKeys = json.length; nIndex < nLenKeys; nIndex++ )
    {
      json[nIndex] = JSONC.compress( json[nIndex], aKeys );
    }
  }
  function compressOther ( json, aKeys )
  {
    var oKeys,
        aKey,
        str,
        nLenKeys,
        nIndex,
        obj;
    aKeys = _getKeys( json, aKeys );
    aKeys = unique( aKeys );
    oKeys = biDimensionalArrayToObject( aKeys );

    str = JSON.stringify( json );
    nLenKeys = aKeys.length;

    for ( nIndex = 0; nIndex < nLenKeys; nIndex++ )
    {
      aKey = aKeys[nIndex];
      str = str.replace( new RegExp( escapeRegExp( '"' + aKey[1] + '"' ), 'g' ), '"' + aKey[0] + '"' );
    }

    obj = JSON.parse( str );
    obj._ = oKeys;
    return obj;
  }
  JSONC.compress = function ( json, optKeys )
  {
    if(!optKeys)
    {
      _nCode = -1;
    }
    var aKeys = optKeys || [],
      obj;

    if ( _isArray( json ) )
    {
      compressArray( json, aKeys );
      obj = json;
    }
    else
    {
      obj = compressOther ( json, aKeys );
    }
    return obj;
  };
  JSONC.decompress = function ( json )
  {
    var nIndex,
      oKeys,
      str,
      sKey,
      nLenKeys,
      jsonCopy = JSON.parse( JSON.stringify( json ) );
    if ( _isArray( json ) )
    {
      for ( nIndex = 0, nLenKeys = json.length; nIndex < nLenKeys; nIndex++ )
      {
        json[nIndex] = this.decompress( json[nIndex] );
      }
    }
    else
    {
      oKeys = JSON.parse( JSON.stringify( jsonCopy._ ) );
      delete jsonCopy._;
      str = JSON.stringify( jsonCopy );
      for( sKey in oKeys)
      {
        if(oKeys.hasOwnProperty(sKey))
        {
          str = str.replace( new RegExp( '"' + sKey + '"', 'g' ), '"' +  oKeys[sKey] + '"' );
        }
      }
    }
    return str ? JSON.parse(str): json ;
  };

  ns.JSONC = JSONC;
}((window.Namespace = {})));