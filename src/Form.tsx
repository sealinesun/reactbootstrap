import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import FormCheck from './FormCheck';
import FormFile from './FormFile';
import FormControl from './FormControl';
import FormGroup from './FormGroup';
import FormLabel from './FormLabel';
import FormRange from './FormRange';
import FormSelect from './FormSelect';
import FormText from './FormText';
import Switch from './Switch';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface FormProps
  extends React.HTMLAttributes<HTMLElement>,
    BsPrefixProps {
  validated?: boolean;
}

type Form = BsPrefixRefForwardingComponent<'form', FormProps> & {
  Group: typeof FormGroup;
  Control: typeof FormControl;
  Check: typeof FormCheck;
  File: typeof FormFile;
  Switch: typeof Switch;
  Label: typeof FormLabel;
  Text: typeof FormText;
  Range: typeof FormRange;
  Select: typeof FormSelect;
};

const propTypes = {
  /**
   * @default {'form'}
   */
  bsPrefix: PropTypes.string,

  /**
   * The Form `ref` will be forwarded to the underlying element,
   * which means, unless it's rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * Mark a form as having been validated. Setting it to `true` will
   * toggle any validation styles on the forms elements.
   */
  validated: PropTypes.bool,
  as: PropTypes.elementType,
};

const FormImpl: Form = (React.forwardRef(
  (
    {
      bsPrefix,
      className,
      validated,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'form',
      ...props
    }: FormProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'form');
    return (
      <Component
        {...props}
        ref={ref}
        className={classNames(
          className,
          validated && 'was-validated',
          bsPrefix,
        )}
      />
    );
  },
) as unknown) as Form;

FormImpl.displayName = 'Form';
FormImpl.propTypes = propTypes;

FormImpl.Group = FormGroup;
FormImpl.Control = FormControl;
FormImpl.Check = FormCheck;
FormImpl.File = FormFile;
FormImpl.Switch = Switch;
FormImpl.Label = FormLabel;
FormImpl.Text = FormText;
FormImpl.Range = FormRange;
FormImpl.Select = FormSelect;

export default FormImpl;
