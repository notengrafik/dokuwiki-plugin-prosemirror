import { inputRules, InputRule } from 'prosemirror-inputrules';
import { TextSelection } from 'prosemirror-state';
import SmileyConf from '../../custom/SmileyConf';

/**
 * Smiley input rule
 *
 * @returns {InputRule}
 */
export function smileyRule() {
    return new InputRule(SmileyConf.getRegex(), ((state, match) => {
        const { tr } = state;
        const syntax = match[1];
        const icon = SmileyConf.getSmileys()[syntax];

        tr.setSelection(TextSelection.create(tr.doc, tr.selection.from, tr.selection.from - syntax.length + 1));
        return tr.replaceSelectionWith(state.schema.nodes.smiley.create({ icon, syntax }));
    }));
}

/**
 * Rules for transforming user input
 *
 * @param {prosemirrorModel.Schema} schema
 * @returns {Plugin}
 */
export default function buildInputRules(schema) {
    const rules = [];
    if (schema.nodes.smiley) {
        rules.push(smileyRule());
    }
    return inputRules({ rules });
}
