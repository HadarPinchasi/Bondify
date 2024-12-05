const infos = [
    {
        validationCustom: "validationCustom01", description: 'First name', inputType: "text", inputId: "validationCustom01",
        patternInput: "[A-Za-z]{1,20}", instructions: 'Letters only, up to about 20 letters'
    },
    {
        validationCustom: "validationCustom02", description: 'Last name', inputType: "text", inputId: "validationCustom02",
        patternInput: "[A-Za-z]{1,20}", instructions: 'Letters only, up to about 20 letters'
    },
    {
        validationCustom: "validationCustom03", description: 'User name', inputType: "text", inputId: "validationCustom03",
        patternInput: ".*.{1,20}", instructions: 'Up to 20 characters'
    },
    {
        validationCustom: "validationCustom04", description: 'Password', inputType: "password", inputId: "validationCustom04",
        patternInput: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$", instructions: 'Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces.'
    },
    {
        validationCustom: "validationCustom05", description: 'Confirm password', inputType: "password", inputId: "validationCustom05",
        patternInput: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$", instructions: 'Rewrite your password'
    }
];
export default infos;
