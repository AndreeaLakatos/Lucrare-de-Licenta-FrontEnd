export class PaginatedResult<T> {
    public paginationMetaData?: PaginationMetaData;
    public result?: T;
}

export class PaginationMetaData {
    constructor(
        public CurrentPage: number,
        public TotalPages: number,
        public PageSize: number,
        public TotalCount: number,
        public HasPrevious: boolean,
        public HasNext: boolean){}
}