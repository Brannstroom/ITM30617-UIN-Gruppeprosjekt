import { createClient } from "@sanity/client";

export default createClient({
    projectId: "pz9qwh5p",
    dataset: "production",
    apiVersion: "2023-04-25",
    useCdn: true,
})