module.exports = err => {
    if (err['errors']) return err.errors.map(it => it.message);
    else return [err];
};
