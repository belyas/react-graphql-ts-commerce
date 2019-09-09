import { useState, useEffect, ChangeEvent } from 'react';

function useFormValidation(initialState: any, validate: (values: {}) => {}) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;

      if (!noErrors) {
        setSubmitting(false);
      }
    }
    // eslint-disable-next-line
  }, [errors]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onBlurHandler = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const onSubmitHanlder = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitting(true);
  };

  return {
    onSubmitHanlder,
    onChangeHandler,
    onBlurHandler,
    values,
    errors,
    isSubmitting,
  };
}

export default useFormValidation;
