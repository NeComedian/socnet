export const maxLength = (size) => (value) => {
    if(value.length>size) return 'Max length ' + size
    return undefined
}

export const required = (value) =>{
    if(!value) return "This field is required"
    console.log(value);
    return undefined
}
