//
// Ce fichier a été généré par l'implémentation de référence JavaTM Architecture for XML Binding (JAXB), v2.2.8-b130911.1802 
// Voir <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Toute modification apportée à ce fichier sera perdue lors de la recompilation du schéma source. 
// Généré le : 2022.02.01 à 09:44:15 AM CET 
//


package com.example.ISISCapitalistJuliagathe.world;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlSchemaType;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Classe Java pour pallierType complex type.
 * 
 * <p>Le fragment de schéma suivant indique le contenu attendu figurant dans cette classe.
 * 
 * <pre>
 * &lt;complexType name="pallierType">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="name" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="logo" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="seuil" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="idcible" type="{http://www.w3.org/2001/XMLSchema}int"/>
 *         &lt;element name="ratio" type="{http://www.w3.org/2001/XMLSchema}double"/>
 *         &lt;element name="typeratio" type="{}typeratioType"/>
 *         &lt;element name="unlocked" type="{http://www.w3.org/2001/XMLSchema}boolean"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "pallierType", propOrder = {
    "name",
    "logo",
    "seuil",
    "idcible",
    "ratio",
    "typeratio",
    "unlocked"
})
public class PallierType {

    @XmlElement(required = true)
    protected String name;
    @XmlElement(required = true)
    protected String logo;
    protected int seuil;
    protected int idcible;
    protected double ratio;
    @XmlElement(required = true)
    @XmlSchemaType(name = "string")
    protected TyperatioType typeratio;
    protected boolean unlocked;

    /**
     * Obtient la valeur de la propriété name.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getName() {
        return name;
    }

    /**
     * Définit la valeur de la propriété name.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setName(String value) {
        this.name = value;
    }

    /**
     * Obtient la valeur de la propriété logo.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLogo() {
        return logo;
    }

    /**
     * Définit la valeur de la propriété logo.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLogo(String value) {
        this.logo = value;
    }

    /**
     * Obtient la valeur de la propriété seuil.
     * 
     */
    public int getSeuil() {
        return seuil;
    }

    /**
     * Définit la valeur de la propriété seuil.
     * 
     */
    public void setSeuil(int value) {
        this.seuil = value;
    }

    /**
     * Obtient la valeur de la propriété idcible.
     * 
     */
    public int getIdcible() {
        return idcible;
    }

    /**
     * Définit la valeur de la propriété idcible.
     * 
     */
    public void setIdcible(int value) {
        this.idcible = value;
    }

    /**
     * Obtient la valeur de la propriété ratio.
     * 
     */
    public double getRatio() {
        return ratio;
    }

    /**
     * Définit la valeur de la propriété ratio.
     * 
     */
    public void setRatio(double value) {
        this.ratio = value;
    }

    /**
     * Obtient la valeur de la propriété typeratio.
     * 
     * @return
     *     possible object is
     *     {@link TyperatioType }
     *     
     */
    public TyperatioType getTyperatio() {
        return typeratio;
    }

    /**
     * Définit la valeur de la propriété typeratio.
     * 
     * @param value
     *     allowed object is
     *     {@link TyperatioType }
     *     
     */
    public void setTyperatio(TyperatioType value) {
        this.typeratio = value;
    }

    /**
     * Obtient la valeur de la propriété unlocked.
     * 
     */
    public boolean isUnlocked() {
        return unlocked;
    }

    /**
     * Définit la valeur de la propriété unlocked.
     * 
     */
    public void setUnlocked(boolean value) {
        this.unlocked = value;
    }

}
