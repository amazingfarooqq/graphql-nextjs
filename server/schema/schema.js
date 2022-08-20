const Template = require("../models/Template");

const { 
  GraphQLObjectType,GraphQLID,GraphQLString,
  GraphQLSchema,GraphQLList,GraphQLNonNull 
} = require("graphql");

const TemplateType = new GraphQLObjectType({
  name: "Template",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    stacks: { type: GraphQLString },
    previewurl: { type: GraphQLString },
    downloadurl: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuertyType",
  fields: {
    templates: {
      type: new GraphQLList(TemplateType),
      resolve(parent, args) {
        return Template.find();
      },
    },
    template: {
      type: TemplateType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Template.findById(args.id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {

    // add templates
    addTemplate: {
      type: TemplateType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        stacks: { type: GraphQLNonNull(GraphQLString) },
        previewurl: { type: GraphQLNonNull(GraphQLString) },
        downloadurl: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const templates = new Template({
          name: args.name,
          description: args.description,
          stacks: args.stacks,
          previewurl: args.previewurl,
          downloadurl: args.downloadurl,
        });
        return templates.save();
      },
    },

    // delete template
    deleteTemplate: {
      type: TemplateType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Template.findByIdAndRemove(args.id);
      },
    },

    // update templates
    updateTemplate: {
      type: TemplateType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        stacks: { type: GraphQLString },
        previewurl: { type: GraphQLString },
        downloadurl: { type: GraphQLString },
      },
      resolve(parent, args) {
        return Template.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              stacks: args.stacks,
              previewurl: args.previewurl,
              downloadurl: args.downloadurl,
            },
          },
          { new: true }
        );
      },
    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
