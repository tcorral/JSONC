<?php
/**
 * Class GzipJSON
 * Class to decompress gzipped string to JSON.
 */
class GzipJSON {
    /**
     * Private method that implements the inflate of the data.
     * @param $data
     * @private
     * @return string
     */
    private function decode_gzip( $data )
    {
        return gzinflate( substr( $data, 10, -8 ) );
    }

    /**
     * Method that returns an associated array via json_decode;
     * @param $data
     * @return mixed
     */
    function decompress( $data )
    {
        $json = json_decode( $this->decode_gzip( utf8_decode( base64_decode( $data ) ) ) );
        if ( is_null( $json ) )
        {
            $json = json_decode( $data );
        }
        return $json;
    }
}