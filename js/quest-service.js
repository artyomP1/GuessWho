var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var QUSEST_kEY = 'QUSEST';
var gLastRes = null;

function createQuestsTree() {

    gQuestsTree = loadQuests();
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    // TODO: update the gPrevQuest, gCurrQuest global vars
    gPrevQuest = gCurrQuest;
    gCurrQuest = gPrevQuest[res];

}

function getCurrQuest() {
    return gCurrQuest;
}

function getPrevQuest() {
    return gPrevQuest;
}

function getLastRes() {
    return gLastRes;
}

function updateLastRes(res) {
    gLastRes = res;
    return getLastRes();
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    gPrevQuest[lastRes] = createQuest(newQuestTxt);
    gPrevQuest[lastRes].no = gCurrQuest;
    gPrevQuest[lastRes].yes = createQuest(newGuessTxt);
    saveGussToStorage(QUSEST_kEY, gQuestsTree);
}

function restartGame() {
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function saveGussToStorage(QUSEST_kEY, gQuestsTree) {
    saveToStorage(QUSEST_kEY, gQuestsTree)
}

function loadQuests(QUSEST_kEY) {
    return loadFromStorage(QUSEST_kEY);
}