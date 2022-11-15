package validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("yValidator")
public class YValidator implements Validator {

    private double Y;
    void setError(){
        FacesMessage msg = new FacesMessage("Incorrect Y val");
        msg.setSeverity(FacesMessage.SEVERITY_ERROR);
        throw new ValidatorException(msg);
    }

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {
        if(o == null) setError();
        else{
            try{
                Y = Double.parseDouble(o.toString());
            }
            catch (NumberFormatException e){
                setError();
            }
            if(Y < -5 || Y > 3) setError();
        }

    }
}
