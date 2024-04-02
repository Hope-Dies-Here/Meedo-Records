
$(".loading-gif").css("display", "block")
$(document).ready(() => {
$(".loading-gif").css("display", "none")
  let name, src, artist, detail, producer, tracks, releaseDate, feat
	$(".art-page-single").click(e => {
	 // let a = e.target.childNode[1].text()
	 let eTargetId = e.target.parentNode.children[1].id
    let albumName = e.target.parentNode.children[1].innerText
    let divName = e.target.parentNode.parentNode.id
    if(eTargetId != "album-name-id"){
      albumName = e.target.children[1].innerText
      divName = e.target.parentNode.id
    }
    
    $(".details-text").text("")
    $("#exampleModalLabel").text("...")
    $(".alb-name-span").text("...")
    $(".artist-name-span").text("...")
    $(".feat-name-span").text("...")
    $(".producer-name-span").text("...")
    $(".released-span").text("...")
	 $(".tracks-span").text("...")
	 $("#modal-img").attr("src", "/img/loading.gif").addClass("smaller")
	 $(".till-it-load").addClass("fade-bg-animation")
    $.post("/test", { albumName: albumName, divName: divName }, (data, textStatus) => {
        name = data.name
        src = data.art
        producer = data.producer
        artist = data.artist.name
        feat = data.feat
        tracks = data.songs
        releaseDate = "data.releaseDate" 
        releaseDate = new Date(data.releaseDate).toDateString()
        
        detail =	"Bahl | Weg is Kassmasse's 2nd Album. It has over 1M views on YouTube and listened over 5M times. More details down below"
      }
    ).done(() => {
      
      console.log(name)
	    $("#exampleModalLabel").text(name)
	    if(divName == "Albums-Div"){
	      $("#tt").css("display", "grid")
	      $("#modal-img").attr("src", `/img/Albums/${src}`).removeClass("smaller") 
	      $(".tracks-span").text(tracks)
	    } else {
	      $("#modal-img").attr("src", `/img/Singles/${src}`).removeClass("smaller")
	      $("#tt").css("display", "none")
	    }
	    $(".alb-name-span").text(name)
	    $(".artist-name-span").text(artist)
	    $(".feat-name-span").text(feat)
	    $(".producer-name-span").text(producer)
	    $(".released-span").text(releaseDate)
	    $(".till-it-load").removeClass("fade-bg-animation")
	    $(".details-text").text(detail)
     })
    
    
	 //$("#exampleModalLabel").text("...")
	  setTimeout(() => {
    console.log(name)
	  }, 2000)
	});
});
