const game_database = {};


let game_id = false;

function new_game(player1, board) {

    const game_data = {
        player1: player1,
        board: board,
        gameover: false,
        createdat: firebase.database.ServerValue.TIMESTAMP,
    };
    if (!game_id) {
        game_id = firebase.database().ref().child('games').push().key
    };

    let updates = {};
    updates['/games/' + game_id] = game_data;

    let game_ref = firebase.database().ref();

    game_ref.update(updates)
        .then(function() {
            return { success: true, message: 'Game created' };
        })
        .catch(function(error) {
            return { success: false, message: `Creating failed: ${error.message}` };
        })
};

function remove_game() {
    if (!game_id) {
        return { success: false, message: `Invalid game` };
    }
    let game_ref = firebase.database().ref('/games/' + game_id)

    game_ref.remove()
        .then(function() {
            return { success: true, message: 'Game removed' };
        })
        .catch(function() {
            return { success: false, message: 'Remove failed' };
        })

};

function update_game(board) {
    if (!game_id) {
        return { success: false, message: `Invalid game` };
    }
    let game_ref = firebase.database().ref('/game/' + game_id)

    let update = {};
    update['/board'] = board;
    update['/lastupdate'] = firebase.database.ServerValue.TIMESTAMP;

    game_ref.update(update)
        .then(function() {
            return { success: true, message: 'Game updated' };
        })
        .catch(function() {
            return { success: false, message: 'Update failed' };
        })

};



function reset_game() {
    if (!game_id) {
        return { success: false, message: `Invalid game` };
    }
    game_id = false
    return { success: true, message: 'Game reset' }
};

async function listen_game() {
    if (!game_id) {
        return { success: false, message: `Invalid game` };
    }
    let game_ref = firebase.database().ref('/game/' + game_id)

    game_ref.once('child_changed')
        .then(function(snapshot) {
            if (snapshot.key == 'board') {
                console.log('Board changed', snapshot.val())
                return { success: true, message: 'Board updated', data: snapshot.val() };
            } else if (snapshot.key == 'gameover') {
                console.log('Game over', snapshot.val())
                return { success: true, message: 'Game over', data: snapshot.val() };
            }
        })
        .catch(function(error) {
            return { success: false, message: `Invalid data: ${error.message}` };
        })


}


game_database.listen = listen_game;
game_database.new = new_game;
game_database.remove = remove_game;
game_database.update = update_game;
game_database.reset = reset_game;