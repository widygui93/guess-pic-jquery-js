$(document).ready(function(){
	//create table
	$("h1").after($("<table></table>"));
	//create row and column with looping
	for(let i=0; i < 5; i++){
		let row = $("<tr></tr>");
		for(let j=0; j < 4; j++){
			let col = $("<td></td>");
			row.append(col);
		}
		$("table").append(row);
	}
	// insert image into cell of table
	let numImage;
	let randIdxStockImage;
	let stockImage = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10];

	for(let i=0; i < 5; i++){
		for(let j=0; j < 4; j++){
			RandomImage()
			$("tr:eq("+i+") td:eq("+j+")").append("<img src='img/"+numImage+".jpeg'>");
			stockImage.splice(randIdxStockImage, 1);
		}
	}

	function RandomImage(){
		randIdxStockImage = Math.floor(Math.random() * stockImage.length);
		numImage = stockImage[randIdxStockImage];
		return numImage;
	}

	//when user click button start
	let numSelectedImages = 0;
	let firstSelectedImgSrc, selectedImgSrc;
	let firstSelectedImgRow, selectedImgRow;
	let firstSelectedImgCol, selectedImgCol;

	let chances;
	chances = $("#chances").text();

	let numOfCorrectImages = 0;

	$("button").click(function(){
		//disable button START
		$("button").attr("disabled","true");
		$("img").slideUp();
		$("td").click(function(){
			$(this).children().slideDown();
			numSelectedImages = numSelectedImages + 1;
			selectedImgSrc = $(this).children().attr("src");
			selectedImgCol = $(this).index();
			selectedImgRow = $(this).parent().index();
			if(numSelectedImages == 2){
				// check if user click same image at the same position
				if(firstSelectedImgCol == selectedImgCol && firstSelectedImgRow == selectedImgRow){
					alert("You may not click the same image at the same position twice");
					chances = chances - 1;
					$("#chances").text(chances);
					$(this).children().slideUp();
					resetVariables()
					checkGameResult()
				}else {
					if(firstSelectedImgSrc == selectedImgSrc){
						alert("You guess the image CORRECT");
						numOfCorrectImages = numOfCorrectImages + 1;
						resetVariables()
						checkGameResult()
					}else {
						alert("You guess the image WRONG");
						chances = chances - 1;
						$("#chances").text(chances);
						$("tr:eq("+firstSelectedImgRow+") td:eq("+firstSelectedImgCol+")").children().slideUp();
						$("tr:eq("+selectedImgRow+") td:eq("+selectedImgCol+")").children().slideUp();
						resetVariables()
						checkGameResult()
					}
				}
			}else {
				firstSelectedImgSrc = selectedImgSrc;
				firstSelectedImgCol = selectedImgCol;
				firstSelectedImgRow = selectedImgRow;
			}
		});
	});
	function checkGameResult(){
		if(numOfCorrectImages == 10 && chances != 0){
			alert("You WON the game");
			window.location.reload();
		} else if(chances == 0){
			alert("You LOSE the game");
			window.location.reload();
		}
	}
	function resetVariables(){
		return numSelectedImages = 0, firstSelectedImgSrc = "", selectedImgSrc = "", 
		firstSelectedImgRow = "", selectedImgRow = "", firstSelectedImgCol = "",selectedImgCol = "";
	}
});