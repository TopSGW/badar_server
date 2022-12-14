import url from 'url';
class ApiResponse {

    constructor(data, page, pageCount, limit, totalCount, req , maxPrice , minPrice) {
        this.data = data;
        this.page = page;
        this.pageCount = pageCount;
        this.limit = limit;
        this.totalCount = totalCount;
        this.links = {};
        if(maxPrice){
            this.maxPrice = maxPrice ;
        }
        if(minPrice){
            this.minPrice = minPrice ;
        }
        let appUrl = req.protocol + '://' + req.get('host') + url.parse(req.originalUrl).pathname;
        this.addSelfLink(appUrl);
        if (page >= 1 && page < pageCount)
          this.addNextLink(appUrl);
        if (page > 1 && page <= pageCount)
            this.addPrevLink(appUrl);
    }

    addSelfLink(appUrl) {
        this.links.self = appUrl + "?page=" + this.page + "&limit=" + this.limit; // self page
    }

    addNextLink(appUrl) {
        const afterPage = this.page + 1;
        this.links.next = appUrl + "?page=" + afterPage + "&limit=" + this.limit; // next page
        this.links.last = appUrl + "?page=" + this.pageCount + "&limit=" + this.limit; // last page
    }

    addPrevLink(appUrl) {
        const prevPage = this.page - 1;
        this.links.prev = appUrl + "?page=" + prevPage + "&limit=" + this.limit; // prev page
        this.links.first = appUrl + "?page=1" + "&limit=" + this.limit; // first page
    }
}

export default ApiResponse;
