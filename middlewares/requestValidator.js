/**
 * Formats joi validation errors into proper array
 *
 * @param {Object} schema
 * @return {Array}
 * @api public
 */

const middleware = (schema, property) => {
    return (req, res, next) => {
        const { value, error, warning  } = schema.validate(req[property],  { abortEarly: false })
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => ( { path: i.path, message: i.message } ));
            res.status(422).json({ error: message })
        }
    }
}
module.exports = middleware;