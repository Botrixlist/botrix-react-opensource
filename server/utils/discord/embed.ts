interface author {
    name: string | null;
    url: string | null;
    icon_url: string | null;
}

interface footer {
    text: string | null,
    icon_url: string | null
}

interface field {
    name: string | null,
    value: string | null,
    inline: boolean
}

interface embed {
    title: string | null;
    description: string | null;
    fields: Array<field>;
    author: author | null;
    footer: footer | null;
    color: string | null;
    url: string | null;
}


export default class BotrixEmbed {

    embed : embed;

    constructor(){
        this.embed = {
            title: null,
            description: null,
            fields: [],
            author: null,
            footer: null,
            color: null,
            url: null,

        }

    }

    setTitle(title : string){
        this.embed.title = title;
        return this;
    }

    setDescription(description : string){
        this.embed.description = description;
        return this;
    }

    setAuthor({name, url, icon_url} : any){
        this.embed.author = {
            name: name ? name : null,
            url: url ? url : null,
            icon_url: icon_url ? icon_url : null
        }
    }

    addField(title : string, value : string, inline : boolean = false) {

        let field : field = {
            name: title,
            value: value,
            inline: inline
        }

        this.embed.fields.push(field);

        return this;
    }

    setColor(color : string){
        this.embed.color = color;
        return this;
    }

}