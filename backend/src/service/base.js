
const populating = (query, populateObj) => {
  if (!populateObj || typeof populateObj === 'string')
    return query.populate(populateObj);
  else if (typeof populateObj === 'function')
    return populateObj(query);
  else if (Array.isArray(populateObj))
    return populateObj.reduce((q, e) => q.populate(e), query);
  else
    return query.populate();
};

module.exports = model => ({
  create: (data) => {
    const entity = new model(data);
    const error = entity.validateSync();
    if (!error)
      return entity.save();
    else
      throw new Error('Create | Model is not valid!');
  },
  search: (expression) => model.find(expression).populate(),
  findAll: () => populating(model.find({}), model.populateAll),
  findOne: id => populating(model.findById(id), model.populateOne),
  updateOne: async (id, data) => {
    const entity = new model(data);
    const error = entity.validateSync();
    if (!error)
      return model.findByIdAndUpdate(id, data, {
        new: true
      });
    else
      throw new Error('Update | Model is not valid!');

  },
  delete: async (id) => {
    const entity = await model.findByIdAndRemove(id);
    if (!entity)
      throw new Error('Not found');
    else
      return entity.delete();
  },
});