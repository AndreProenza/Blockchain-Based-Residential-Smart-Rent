import Form from 'react-bootstrap/Form';

export const CheckboxRental = () => {
    return (
        <Form>
            {['radio'].map((type) => (
                <div key={`inline-${type}`}>
                    <Form.Check
                        inline
                        label="Long Term"
                        name="group1"
                        type={type}
                        id={`inline-${type}-1`}
                    />
                    <Form.Check
                        inline
                        label="Short Term"
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                    />
                </div>
            ))}
        </Form>
    );
};