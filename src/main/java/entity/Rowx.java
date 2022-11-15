package entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
public class Rowx implements Serializable {
    @Id
    @GeneratedValue
    private Long id;
    private double x;
    private double y;

    private double r;

    private double time;

    private boolean result;

    private String date;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public double getTime() {
        return time;
    }

    public void setTime(double time) {
        this.time = time;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isInArea(double x, double y, double r){
        if(x >= 0 && y >= 0){
            return x <= r && y <= r;
        }
        else if(x <= 0 && y >= 0){
            return x*x + y*y <= r*r/4;
        }
        else if(x <= 0 && y <= 0){
            return y >= -2*x - r;
        }
        else return false;
    }
}
