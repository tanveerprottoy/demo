export const Constants = {
    API: "api",
    API_VERSION_1: "1",
    COLLECTION_NAME: "rbacs"
} as const;

export const RouteNames = {
    "rbacs.POST": "rbacs.create",
    "rbacs.GET": "rbacs.getAll",
    "rbacs.p.GET": "rbacs.getOne",
} as const;