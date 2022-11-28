import { searchAlbum } from "../api/data.js";
import {html, nothing} from "../lib.js"

const searchTemplate = (isClicked, onSearch, albums, hasUser) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    ${
        isClicked ?
            html`<div class="search-result">
                </div>
                ${albums.length > 0 ? albums.map(album => createCardTemplate(album, hasUser)):
                html`<p class="no-result">No result.</p>`}` : nothing}
            
    
</section>`;

const createCardTemplate = (album, hasUser) => html`
<div class="card-box">
    <img src="./images/BrandiCarlile.png">
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${hasUser ? 
            html`<div class="btn-group">
                    <a href="/details/${album._id}" id="details">Details</a>
                </div>` : nothing}
        
    </div>
</div>`
export async function showSearch(ctx){
    ctx.render(searchTemplate(false, onSearch));
    
    async function onSearch(e){
        const searchedInput = document.getElementById("search-input");
        const query = searchedInput.value;
        
        if(!query){
            return alert("Field is empty");
        }
        
        const albums = await searchAlbum(query);
        const hasUser = !!ctx.user;
        ctx.render(searchTemplate(true, onSearch, albums, hasUser))
    }
}