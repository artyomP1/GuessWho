'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);

function init() {
    createQuestsTree();
}

function onStartGuessing() {
    // TODO: hide the game-start section
    $('.game-start').css('display', 'none');
    // TODO: show the quest section
    renderQuest();
    $('.quest').css('display', 'block');
}

function renderQuest() {
    // TODO: select the <h2> inside quest and update its text by the currQuest text
    var CurrQuest = getCurrQuest();
    $('.quest h2').html(CurrQuest.txt);
}

function onUserResponse(res) {
    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            $('.quest').css('display', 'none');
            $('.game-over').css('display', 'block');
            // TODO: improve UX
        } else {
            alert('I dont know...teach me!')
            // TODO: hide and show new-quest section
            $('.quest').css('display', 'none');
            $('.new-quest').css('display', 'block');
        }
    } else {
        gLastRes = updateLastRes(res);
        var lastRes = getLastRes();
        // TODO: update the lastRes global var
        console.log(gCurrQuest[gLastRes]);
        moveToNextQuest(lastRes);
        renderQuest();
    }
}

function onAddGuess() {
    // TODO: Get the inputs' values
    var newQuestTxt = $('#newQuest').val();
    var newGuessTxt = $('#newGuess').val();
    var lastRes = getLastRes();
    // TODO: Call the service addGuess
    addGuess(newQuestTxt, newGuessTxt, lastRes);
    onRestartGame();
}


function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    $('.game-over').css('display', 'none');
    gLastRes = null;
    restartGame();
}

