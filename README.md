JSONC
=====
# Update to version 0.3.0

[![Build Status](https://travis-ci.org/tcorral/JSONC.png)](https://travis-ci.org/tcorral/JSONC)

[Changelog](https://raw.github.com/tcorral/JSONC/master/changelog.txt)

## Background

One of the problems you can have developing RIA applications using Javascript is the amount of data being transported to
and from the server.
When data comes from server, this data could be GZipped, but this is not possible when the big amount of data comes from
the browser to the server.

JSONC has two differents approaches to reduce the size of the amount of data to be transported:

* *JSONC.compress* - Compress JSON objects using a map to reduce the size of the keys in JSON objects.
    * Be careful with this method because it's really impressive if you use it with a JSON with a big amount of data, but it
could be awful if you use it to compress JSON objects with small amount of data because it could increase the final size.
    * The rate compression could variate from 7.5% to 32.81% depending of the type and values of data.
* *JSONC.getLZWStringFromJSON* - Compress JSON objects using LZW compression algorithm, to make the job JSONC uses the
lz-string library from @pieroxy - https://github.com/pieroxy/lz-string/
    * You can use getLZWStringFromJSON to compress any JSON objects even if these objects are not been compressed using JSONC
See Usage for more details.

##Usage

###Compress a JSON object:

    var compressedJSON = JSONC.compress( json );    // Returns a JSON object but compressed.

###Decompress a JSON object:

    var json = JSONC.decompress( compressedJSON );    // Returns the original JSON object.

###Compress a normal JSON object as a LZW string:

    var lzwString = JSONC.getLZWStringFromJSON( json ); // Returns the LZW representation as string of the JSON object.

###Compress a JSON object as a LZW string after compress it using JSONC:

    var lzwString = JSONC.getLZWStringFromJSON( json, true ); // Returns the LZW representation as string of the JSON object.

###Decompress a normal JSON object from a LZW string:

    var json = JSONC.getJSONFromLZWString( lzwString ); // Returns the original JSON object.

###Decompress a JSON compressed object using JSONC from a LZW string:

    var json = JSONC.getJSONFromLZWString( lzwString, true ); // Returns the original JSON object.

## Examples of compression

###Example data.js.

    Original - 17331 bytes
    Compressed using JSONC - 16025 bytes
    Compression rate - 7.5%


    Original compressed using lz-string - 3822 bytes
    Compressed using JSONC using lz-string - 3689 bytes
    Compression rate - 3.4%


    Compression rate from original to compressed using JSONC and lz-string - 78.71%

###Example data2.js.

    Original - 19031 bytes
    Compressed using JSONC - 12787 bytes
    Compression rate - 32.81%


    Original compressed using lz-string - 3900 bytes
    Compressed using JSONC using lz-string - 3113 bytes
    Compression rate - 20.18%


    Compression rate from original to compressed using JSONC and lz-string - 83.64%