export const generateSlug = (title : string) => {

        return title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-')

    }