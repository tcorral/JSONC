$(function() {
  $( "#accordion_data, #accordion_usage, #accordion_server" ).accordion( { active: false, collapsible: true } );
  $("#clean_compress_json_data_button").click(function()
  {
    $("#results_compress_json_data").html("");
    return false;
  });
  $("#compress_json_data_1_button").click(function(event)
  {
    var compressedJSON = JSONC.compress( obj );
    var stringCompressedJSON = JSON.stringify(compressedJSON);
    $("#results_compress_json_data").html( "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>");
    return false;
  });
  $("#compress_json_data_2_button").click(function(event)
  {
    var compressedJSON = JSONC.compress( obj2 );
    var stringCompressedJSON = JSON.stringify(compressedJSON);
    $("#results_compress_json_data").html(  "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>" );
    return false;
  });
  $("#clean_pack_json_data_button").click(function()
  {
    $("#results_pack_json_data").html("");
    return false;
  });
  $("#pack_json_data_1_button").click(function(event)
  {
    var stringCompressedJSON = JSONC.pack( obj );
    $("#results_pack_json_data").html( "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>");
    return false;
  });
  $("#pack_json_data_2_button").click(function(event)
  {
    var stringCompressedJSON = JSONC.pack( obj2 );
    $("#results_pack_json_data").html(  "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>" );
    return false;
  });

  $("#clean_pack_compress_json_data_button").click(function()
  {
    $("#results_pack_compress_json_data").html("");
    return false;
  });
  $("#pack_compress_json_data_1_button").click(function(event)
  {
    var stringCompressedJSON = JSONC.pack( obj, true );
    $("#results_pack_compress_json_data").html( "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>");
    return false;
  });
  $("#pack_compress_json_data_2_button").click(function(event)
  {
    var stringCompressedJSON = JSONC.pack( obj2, true );
    $("#results_pack_compress_json_data").html(  "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>" );
    return false;
  });

  $("#clean_decompress_json_data_button").click(function()
  {
    $("#results_decompress_json_data").html("");
    return false;
  });
  $("#decompress_json_data_1_button").click(function(event)
  {
    var oComp = JSONC.compress( obj );
    var stringCompressedJSON = JSON.stringify( JSONC.decompress( oComp ) );
    $("#results_decompress_json_data").html( "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>");
    return false;
  });
  $("#decompress_json_data_2_button").click(function(event)
  {
    var oComp = JSONC.compress( obj2 );
    var stringCompressedJSON = JSON.stringify( JSONC.decompress( oComp ) );
    $("#results_decompress_json_data").html(  "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>" );
    return false;
  });

  $("#clean_unpack_json_data_button").click(function()
  {
    $("#results_unpack_json_data").html("");
    return false;
  });
  $("#unpack_json_data_1_button").click(function(event)
  {
    var gzipped = JSONC.pack( obj );
    var stringCompressedJSON = JSON.stringify( JSONC.unpack( gzipped ) );
    $("#results_unpack_json_data").html( "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>");
    return false;
  });
  $("#unpack_json_data_2_button").click(function(event)
  {
    var gzipped = JSONC.pack( obj2 );
    var stringCompressedJSON = JSON.stringify( JSONC.unpack( gzipped ) );
    $("#results_unpack_json_data").html(  "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>" );
    return false;
  });


  $("#clean_unpack_compress_json_data_button").click(function()
  {
    $("#results_unpack_compressed_json_data").html("");
    return false;
  });
  $("#unpack_compress_json_data_1_button").click(function(event)
  {
    var gzipped = JSONC.pack( obj, true );
    var stringCompressedJSON = JSON.stringify( JSONC.unpack( gzipped, true ) );
    $("#results_unpack_compressed_json_data").html( "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>");
    return false;
  });
  $("#unpack_compress_json_data_2_button").click(function(event)
  {
    var gzipped = JSONC.pack( obj2, true );
    var stringCompressedJSON = JSON.stringify( JSONC.unpack( gzipped, true ) );
    $("#results_unpack_compressed_json_data").html(  "<div class='size'>" + stringCompressedJSON.length + " bytes.</div> <div>" + stringCompressedJSON + "</div>" );
    return false;
  });
});
$("form").submit(function(event)
{
  var sObj, nLenObjStr, sZipped, nLenZipped;
  sObj = JSON.stringify( obj );
  nLenObjStr = sObj.length;
  sZipped = JSONC.pack( obj );
  //sZipped = JSONC.pack( obj, true ); //version compact
  nLenZipped = sZipped.length;

  console.log( 'Original:', sObj, sObj.length );
  console.log( 'Send:', sZipped, sZipped.length );
  $.ajax({
    url: "/obj/demo_pack_gzip_with_base64/alo.php",
    type: "POST",
    data: { json: nLenObjStr > nLenZipped ? sZipped : sObj },
    dataType: 'json',
    success: function( data )
    {
      document.getElementById('info_server').innerHTML = 'Press F12 to open developer tools and check the console tab';
      //data = JSONC.decompress( data ); //version compact
      console.log('Data:', data, JSON.stringify(data).length);
    },
    error: function()
    {
      console.log.apply(console, arguments);
    }
  });
  event.preventDefault();
});