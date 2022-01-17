$(document).ready(function () {
    $(".main__announcement").hide();
});

let gameStats = [0, 0, 0];
let currTurn;

function updateStats() {
    $("#x-stat").text(gameStats[0]);
    $("#tie-stat").text(gameStats[1]);
    $("#o-stat").text(gameStats[2]);
}

let gameBoard = [
    null, null, null,
    null, null, null,
    null, null, null
]

function updateBoard() {
    for (let i = 0; i < 9; i++) {
        $(".tile__mark").eq(i).text(gameBoard[i]);
    }
}

$("#select__form").change(function (e) {
    $(".mark__label").removeClass("text-gray-900 bg-teal-400 bg-yellow-500");
    $(".mark__label").addClass("text-gray-500 hover:text-gray-900 hover:bg-gray-400");
    const radioChecked = $(this).children(".mark__radio:checked");
    radioChecked.prev(".mark__label").removeClass("text-gray-500 hover:text-gray-900 hover:bg-gray-400");
    if (radioChecked.val() === "X") {
        radioChecked.prev(".mark__label").addClass("text-gray-900 bg-teal-400");
    } else {
        radioChecked.prev(".mark__label").addClass("text-gray-900 bg-yellow-500");
    }
});

$("#select__form").submit(function (e) {
    e.preventDefault();
    const radioChecked = $(this).children(".mark__radio:checked");
    if (radioChecked.length) {
        loadGame();
    } else {
        $(".alert__text").text("Select A Mark To Start");
        $(".main__alert").fadeIn("slow");
    }
});

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function renderTiles() {
    $(".board__tiles").animate({
        height: "24rem"
    }, 500)
    await sleep(500);
    for (let i = 0; i < 9; i++) {
        $(".board__tiles").append(`<button class="tiles__tile bg-gray-800 rounded-xl transition relative pointer-events-none" style="opacity: 0;"><span class="tile__mark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-fredoka text-7xl text-gray-500 transition" style="opacity: 0;"></span</button>`);
    }
    for (let i = 0; i < 9; i++) {
        $(".tiles__tile").eq(i).css("opacity", 1);
        await sleep(100);
    }
}

function loadGame() {
    $(".main__announcement").fadeOut("slow");
    $(".main__alert").fadeOut("slow");
    $(".main__menu").fadeOut("slow", async function () {
        $(".board__tiles").empty();
        await sleep(1000);
        $(".main__board").fadeIn("slow", async function () {
            await sleep(500);
            renderTiles();
            // $("#turn__mark").text(radioChecked.val().toString());
            $("#turn__mark").text("X");
            $("#turn__mark").addClass("mr-2");
            $("#turn__mark").animate({
                opacity: 1
            }, 200);
            await sleep(1000);
            // gameStart(radioChecked.val().toString())
            gameStart("X")
        })
    });
}

async function gameStart(turn) {
    gameBoard.fill(null);
    await sleep(1000);
    $(".tiles__tile").removeClass("pointer-events-none");
    $(".tiles__tile").hover(function () {
        $(this).children(".tile__mark").text(turn);
        $(this).children(".tile__mark").css("opacity", 1);
    }, function () {
        if (!$(this).val()) {
            $(this).children(".tile__mark").text("");
            $(this).children(".tile__mark").css("opacity", 0);
        }
    }
    );
    $(".tiles__tile").click(async function (e) {
        $(this).addClass("pointer-events-none");
        $(this).val(turn);
        $(this).children(".tile__mark").text(turn);
        $(this).children(".tile__mark").css("opacity", 1);
        console.log();
        gameBoard[$(this).index(".tiles__tile")] = turn;
        if (turn === "X") {
            $(this).children(".tile__mark").removeClass("text-gray-500");
            $(this).children(".tile__mark").addClass("text-teal-400");
            turn = "O";
            $("#turn__mark").text(turn)
        } else {
            $(this).children(".tile__mark").removeClass("text-gray-500");
            $(this).children(".tile__mark").addClass("text-yellow-500");
            turn = "X";
            $("#turn__mark").text(turn)
        }
        currTurn = turn;
        checkWinner(turn);
    });
}

function checkWinner(turn, conceed = 0) {
    // Check Left To Right 
    for (let i = 0; i < 9; i += 3) {
        if (gameBoard[i] === "X" && gameBoard[i + 1] === "X" && gameBoard[i + 2] === "X") {
            for (let j = i; j < i + 3; j++) {
                $(".tiles__tile").eq(j).removeClass("bg-gray-800");
                $(".tiles__tile").eq(j).children(".tile__mark").removeClass("text-teal-400");
                $(".tiles__tile").eq(j).addClass("bg-teal-400");
                $(".tiles__tile").eq(j).children(".tile__mark").addClass("text-gray-900");
            }
            announceWinner("X")
            return;
        }
        if (gameBoard[i] === "O" && gameBoard[i + 1] === "O" && gameBoard[i + 2] === "O") {
            for (let j = i; j < i + 3; j++) {
                $(".tiles__tile").eq(j).removeClass("bg-gray-800");
                $(".tiles__tile").eq(j).children(".tile__mark").removeClass("text-yellow-500");
                $(".tiles__tile").eq(j).addClass("bg-yellow-500");
                $(".tiles__tile").eq(j).children(".tile__mark").addClass("text-gray-900");
            }
            announceWinner("O")
            return;
        }
    }
    // Check Top To Bottom 
    for (let i = 0; i < 3; i += 1) {
        if (gameBoard[i] === "X" && gameBoard[i + 3] === "X" && gameBoard[i + 6] === "X") {
            for (let j = i; j < i + 7; j += 3) {
                $(".tiles__tile").eq(j).removeClass("bg-gray-800");
                $(".tiles__tile").eq(j).children(".tile__mark").removeClass("text-teal-400");
                $(".tiles__tile").eq(j).addClass("bg-teal-400");
                $(".tiles__tile").eq(j).children(".tile__mark").addClass("text-gray-900");
            }
            announceWinner("X")
            return;
        }
        if (gameBoard[i] === "O" && gameBoard[i + 3] === "O" && gameBoard[i + 6] === "O") {
            for (let j = i; j < i + 7; j += 3) {
                $(".tiles__tile").eq(j).removeClass("bg-gray-800");
                $(".tiles__tile").eq(j).children(".tile__mark").removeClass("text-yellow-500");
                $(".tiles__tile").eq(j).addClass("bg-yellow-500");
                $(".tiles__tile").eq(j).children(".tile__mark").addClass("text-gray-900");
            }
            announceWinner("O")
            return;
        }
    }
    // Checks Across \
    if (gameBoard[0] === "X" && gameBoard[4] === "X" && gameBoard[8] === "X") {
        for (let i = 0; i < 9; i += 4) {
            $(".tiles__tile").eq(i).removeClass("bg-gray-800");
            $(".tiles__tile").eq(i).children(".tile__mark").removeClass("text-teal-400");
            $(".tiles__tile").eq(i).addClass("bg-teal-400");
            $(".tiles__tile").eq(i).children(".tile__mark").addClass("text-gray-900");
        }
        announceWinner("X")
        return;
    }
    if (gameBoard[0] === "O" && gameBoard[4] === "O" && gameBoard[8] === "O") {
        for (let i = 0; i < 9; i += 4) {
            $(".tiles__tile").eq(i).removeClass("bg-gray-800");
            $(".tiles__tile").eq(i).children(".tile__mark").removeClass("text-yellow-500");
            $(".tiles__tile").eq(i).addClass("bg-yellow-500");
            $(".tiles__tile").eq(i).children(".tile__mark").addClass("text-gray-900");
        }
        announceWinner("O")
        return;
    }
    // Checks Across /
    if (gameBoard[2] === "X" && gameBoard[4] === "X" && gameBoard[6] === "X") {
        for (let i = 2; i < 7; i += 2) {
            $(".tiles__tile").eq(i).removeClass("bg-gray-800");
            $(".tiles__tile").eq(i).children(".tile__mark").removeClass("text-teal-400");
            $(".tiles__tile").eq(i).addClass("bg-teal-400");
            $(".tiles__tile").eq(i).children(".tile__mark").addClass("text-gray-900");
        }
        announceWinner("X")
        return;
    }
    if (gameBoard[2] === "O" && gameBoard[4] === "O" && gameBoard[6] === "O") {
        for (let i = 2; i < 7; i += 2) {
            $(".tiles__tile").eq(i).removeClass("bg-gray-800");
            $(".tiles__tile").eq(i).children(".tile__mark").removeClass("text-yellow-500");
            $(".tiles__tile").eq(i).addClass("bg-yellow-500");
            $(".tiles__tile").eq(i).children(".tile__mark").addClass("text-gray-900");
        }
        announceWinner("O")
        return;
    }
    // Checks For Tie
    if (gameBoard.findIndex(i => i === null) === -1) {
        announceWinner("TIE")
        return;
    }
    //Checks If Player Conceeded
    if (conceed !== 0) {
        if (turn === "X") {
            announceWinner("O")
        } else {
            announceWinner("X")
        }
        return;
    }

    function announceWinner(winner) {
        $(".tiles__tile").addClass("pointer-events-none");
        if (winner === "X") {
            $(".alert__winner").removeClass("text-gray-500 text-yellow-500");
            $(".alert__winner").addClass("text-teal-400");
            $("#alert__winner").text("X Won!");
            $(".winner__mark").text("X");
            $(".winner__message").text("Takes The Round")
            gameStats[0] += 1;
        } else if (winner === "O") {
            $(".alert__winner").removeClass("text-gray-500 text-teal-400");
            $(".alert__winner").addClass("text-yellow-500");
            $("#alert__winner").text("O Won!");
            $(".winner__mark").text("O");
            $(".winner__message").text("Takes The Round")
            gameStats[2] += 1;
        } else {
            $(".alert__winner").removeClass("text-teal-400 text-yellow-500");
            $(".alert__winner").addClass("text-gray-500");
            $("#alert__winner").text("It's A...");
            $(".winner__mark").text("");
            $(".winner__message").text("TIE")
            gameStats[1] += 1;
        }
        $(".main__announcement").fadeIn("slow");
        updateStats();
    }
}

$("#next-round").click(async function (e) {
    $(".board__tiles").animate({
        height: 0
    }, 500, function () {
        loadGame();
    })

});

$("#controls__conceed").click(function (e) {
    checkWinner(currTurn, 1)
});