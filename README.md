JSONC
=====

JSON compressor-decompressor is a library to compress big JSON data.

This library should be used only when the improvement of compression is important.

The rate compression could variate from 8% to 30% depending of the type and values of data.

Use lz-string library to compress more https://github.com/pieroxy/lz-string/


Ex. Original - 17331 bytes
    Compressed using JSONC - 16025 bytes
    Compression rate - 7.5%

    Original compressed using lz-string - 3822 bytes
    Compressed using JSONC using lz-string - 3689 bytes
    Compression rate - 3,4%

    Compression rate from original to compressed using JSONC and lz-string - 78.71%