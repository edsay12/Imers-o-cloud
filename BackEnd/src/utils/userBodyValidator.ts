import { body } from "express-validator";

function userBodyValidator(type: "signUp" | "signIn" | "verify") {
  switch (type) {
    case "signUp":
      return [
        body("nickname").notEmpty().isLength({ min: 6 }),
        body("given_name").notEmpty().isLength({ min: 4 }), // nome
        body("email").isEmail().notEmpty(),
        body("phone_number").isMobilePhone("pt-BR"),
        body("password").matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .withMessage('A senha deve conter pelo menos 1 número, 1 caractere especial, 1 letra maiúscula e 1 letra minúscula, com no mínimo 8 caracteres.'),
        // body("family_name").notEmpty().isString(), // family_name
      ];

    // phone_number
    // email
    // given_name

    // family_name
    // nickname

    case "signIn":
      return [
        body("email").notEmpty().isLength({ min: 6 }),
        body("password").isString().isLength({ min: 8 }),
      ];

    case "verify":
      return [
        body("email").notEmpty().isLength({ min: 6 }),
        body("code").isString().isLength({ min: 6, max: 6 }),
      ];
  }
}

export default userBodyValidator;
