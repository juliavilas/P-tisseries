package com.example.ISISCapitalistJuliagathe;

import com.example.ISISCapitalistJuliagathe.world.PallierType;
import com.example.ISISCapitalistJuliagathe.world.ProductType;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("generic")
public class Webservice {
    Services services;
    public Webservice() {
        services = new Services();
    }
    @GET
    @Path("world")
    @Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
    public Response getWorld(@Context HttpServletRequest request) {
        //System.out.println("getWorld "+request.getHeader("X-User"));
        return Response.ok(services.getWorld(request.getHeader("X-User"))).build();
    }
 
    @PUT
    @Path("product")
    public void putProduct(@Context HttpServletRequest request, ProductType product) {
        services.updateProduct(request.getHeader("X-User"), product);
    }
  
    @PUT
    @Path("manager")
    public void putManager(@Context HttpServletRequest request, PallierType manager) {
       services.updateManager(request.getHeader("X-User"), manager);
    }
    
    @PUT
    @Path("unlock")
    public void putUnlock(@Context HttpServletRequest request, PallierType unlock) {
        services.updateUnlock(request.getHeader("X-User"), unlock);
    }
  
    @PUT
    @Path("angel")
    public void putAngel(@Context HttpServletRequest request, PallierType angel) {
       services.updateAngel(request.getHeader("X-User"), angel);
    }
}
