(function(ns)
{

  var JSONC = {},
      _nCode = -1,
      toString = {}.toString;

  if ( !Array.prototype.contains )
  {
    Array.prototype.contains = function ( v )
    {
      var i;
      for ( i = 0; i < this.length; i++ )
      {
        if ( this[i][1] === v )
        {
          return true;
        }
      }
      return false;
    };
  }
  if ( !Array.prototype.unique )
  {
    Array.prototype.unique = function () {
      var i,
          arr = [];
      for ( i = 0; i < this.length; i++)
      {
        if ( !arr.contains( this[i][1] ) ) {
          arr.push( this[i] );
        }
      }
      return arr;
    };
  }
  if(!RegExp.escape)
  {
    RegExp.escape = function( text )
    {
      return text.replace( /[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&" );
    };
  }
  function _isObject ( obj )
  {
    return toString.call( obj ) === "[object Object]";
  }
  function _isArray ( obj )
  {
    return toString.call( obj ) === "[object Array]";
  }
  function _numberToKey ( index, totalChar, offset ){
    totalChar = totalChar || 25;
    offset = offset || 65;
    var aArr = [];
    var currentChar = index;
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
  function _getKeys ( json )
  {
    var oKeys = [],
      aKey,
      sKey,
      oItem;

    for ( sKey in json )
    {
      if ( json.hasOwnProperty( sKey ) )
      {
        oItem = json[sKey];
        if (_isObject( oItem ) || _isArray( oItem ) )
        {
          oKeys = oKeys.concat( _getKeys( oItem ) );
        }
        if(isNaN(Number(sKey)))
        {
          _nCode += 1;
          if ( !oKeys.contains( sKey ) )
          {
            aKey = [];
            aKey.push( _getSpecialKey( _numberToKey( _nCode ) ), sKey );
            oKeys.push( aKey );
          }
        }
      }
    }
    return oKeys;
  }

  JSONC.compress = function ( json )
  {
    var aKeys,
      aKey,
      obj,
      str,
      nIndex,
      nLenKeys;
    if ( _isArray( json ) )
    {
      for ( nIndex = 0, nLenKeys = json.length; nIndex < nLenKeys; nIndex++ )
      {
        json[nIndex] = this.compress( json[nIndex] );
      }
    }
    else
    {
      aKeys = _getKeys( json );
      aKeys = aKeys.unique();
      str = JSON.stringify( json );
      nLenKeys = aKeys.length;

      for ( nIndex = 0; nIndex < nLenKeys; nIndex++ )
      {
        aKey = aKeys[nIndex];
        str = str.replace( new RegExp( RegExp.escape( '"' + aKey[1] + '"' ), "g" ), '"' + aKey[0] + '"' );
      }

      obj = JSON.parse( str );
      obj._ = aKeys;
    }
    return obj || json;
  };
  JSONC.decompress = function ( json )
  {
    var aKeys,
      nIndex,
      str,
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
      aKeys = jsonCopy._.concat();
      nLenKeys = aKeys.length;
      delete jsonCopy._;
      str = JSON.stringify( jsonCopy );
      for ( nIndex = 0; nIndex < nLenKeys; nIndex++ )
      {
        aKey = aKeys[nIndex];
        str = str.replace( new RegExp( '"' + aKey[0] + '"', "g" ), '"' +  aKey[1] + '"' );
      }
    }
    return str ? JSON.parse(str): json ;
  };

  ns.JSONC = JSONC;
}((window.Namespace = {})));