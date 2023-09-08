import insertPost from './post.js'
import Postagem from '../../src/models/Postagem.js';
import API from './lib/auth.js';

function loadFormSubmit() {
    const form = document.querySelector('form');

    form.onsubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('/newpost', {
            method: 'post',
            body: JSON.stringify(Postagem),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API.getToken()}`
            },
        });

        const newpost = await response.json();

        insertPost(newpost);
    }
};

if(API.isAuthenticated()) {
    loadFormSubmit();
}