export default class Api{
    getAppData(){
        const promises = [
            this._getMovies(),
            this._getTvShows()
        ];
        return Promise.all(promises);
    }

    _getMovies(){
        return fetch("./static/movies.json").then((response)=>{
            return response.json();
        }).then((data)=>{
            return {ref:"Movies", data};
        });
    }

    async _getTvShows(){
        const stream = await fetch("./static/series.json");
        const data = await stream.json();
        return {ref:"TvShows", data};
    }
}

