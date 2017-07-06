'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _draftJs = require('draft-js');

var _removeBlock = require('./utils/removeBlock');

var _removeBlock2 = _interopRequireDefault(_removeBlock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setEntityDataFn = function setEntityDataFn(contentBlock, _ref) {
  var getEditorState = _ref.getEditorState,
      setEditorState = _ref.setEditorState;
  return function (data) {
    var entityKey = contentBlock.getEntityAt(0);
    if (entityKey) {
      var editorState = getEditorState();
      var contentState = editorState.getCurrentContent();
      contentState.mergeEntityData(entityKey, _extends({}, data));
      setEditorState(_draftJs.EditorState.forceSelection(editorState, editorState.getSelection()));
    }
  };
};

var removeBlockFn = function removeBlockFn(contentBlock, _ref2) {
  var getEditorState = _ref2.getEditorState,
      setEditorState = _ref2.setEditorState;
  return function () {
    setEditorState((0, _removeBlock2.default)(getEditorState(), contentBlock.get('key')));
  };
};

var entityPropsPlugin = function entityPropsPlugin() {
  return {
    blockRendererFn: function blockRendererFn(contentBlock, pluginEditor) {
      var contentState = pluginEditor.getEditorState().getCurrentContent();
      var entityKey = contentBlock.getEntityAt(0);
      var entityData = entityKey ? contentState.getEntity(entityKey).data : {};
      return {
        props: {
          pluginEditor: pluginEditor,
          entityData: entityData,
          setEntityData: setEntityDataFn(contentBlock, pluginEditor),
          removeBlock: removeBlockFn(contentBlock, pluginEditor)
        }
      };
    }
  };
};

exports.default = entityPropsPlugin;