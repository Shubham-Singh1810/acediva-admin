import React from 'react';
import {Route, Routes} from "react-router-dom"
import Dashboard from '../Pages/Dashboard/Dashboard';
import CategoriesList from '../Pages/Category/CategoriesList';
import SubCategoriesList from '../Pages/Category/SubCategoryList';
import BrandsList from '../Pages/Brand/BrandsList';
import AttributeSetList from '../Pages/Attribute/AttributeSetList';
import AttributeList from '../Pages/Attribute/AttributeList';
import DriverList from '../Pages/Driver/DriverList';
import VendorList from '../Pages/Vendor/VendorList';
import BannerList from '../Pages/Banner/BannerList';
import DriverApproval from '../Pages/Driver/DriverApproval';
import TagList from '../Pages/Tag/TagList';
import ProductTypeList from '../Pages/Product/ProductTypeList';
import TaxList from '../Pages/Tax/TaxList';
import ProductManufactureLocactionList from '../Pages/Product/ProductManufactureLocationList';
import ProductList from '../Pages/Product/ProductList';
import AddProduct from '../Pages/Product/AddProduct';
import VendorApproval from '../Pages/Vendor/VendorApproval';
import UserFaq from '../Pages/Support/Faq/UserFaq';
import UserTermsAndCondition from '../Pages/Support/TermsAndCondition/UserTermsAndCondition';
import ProductUpdateStep2 from '../Pages/Product/ProductUpdateStep2';
import DriverTermsAndCondition from '../Pages/Support/TermsAndCondition/DriverTermsAndCondition';
import VendorTermsAndCondition from '../Pages/Support/TermsAndCondition/VendorTermsAndCondition';
import ProductUpdateStep3 from '../Pages/Product/ProductUpdateStep3';
import NotificationList from '../Pages/Notification/NotificationList';
import ProductUpdateAttribute from '../Pages/Product/ProductUpdateAtrribute';
import RoleList from '../Pages/CommandCenter/RoleList';
import PermissionList from '../Pages/CommandCenter/PermissionList';
import AdminList from '../Pages/CommandCenter/AdminList';

function AuthenticatedRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard/>}/>

        {/* categories  */}
        <Route path="/category-list" element={<CategoriesList/>}/>
        <Route path="/sub-category-list" element={<SubCategoriesList/>}/>

        {/* attribute */}
        <Route path="/attribute-set-list" element={<AttributeSetList/>}/>
        <Route path="/attribute-list" element={<AttributeList/>}/>

        {/* brand */}
        <Route path="/brand-list" element={<BrandsList/>}/>

        {/* drivers */}
        <Route path="/driver-list" element={<DriverList/>}/>
        <Route path="/driver-approval/:id" element={<DriverApproval/>}/>

        {/* vendor */}
        <Route path="/vendor-list" element={<VendorList/>}/>
        <Route path="/vendor-approval/:id" element={<VendorApproval/>}/>

        {/* Banner */}
        <Route path="/banner-list" element={<BannerList/>}/>

        {/* tag */}
        <Route path="/tag-list" element={<TagList/>}/>

         {/* tax */}
         <Route path="/tax-list" element={<TaxList/>}/>


        {/* product type  */}
        <Route path="/product-type-list" element={<ProductTypeList/>}/>

        {/* product manufacture  */}
        <Route path="/product-manufacture-location-list" element={<ProductManufactureLocactionList/>}/>

        {/* product   */}
        <Route path="/product-list" element={<ProductList/>}/>
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/update-product-step2/:id" element={<ProductUpdateStep2/>}/>
        <Route path="/update-product-step3/:id" element={<ProductUpdateStep3/>}/>
        <Route path="/update-product-attributes/:id" element={<ProductUpdateAttribute/>}/>
        
        {/* support */}
        <Route path="/faq-user-list" element={<UserFaq/>}/>
        <Route path="/user-terms-condition" element={<UserTermsAndCondition/>}/>
        <Route path="/driver-terms-condition" element={<DriverTermsAndCondition/>}/>
        <Route path="/vendor-terms-condition" element={<VendorTermsAndCondition/>}/>
        
        {/* notification */}
        <Route path="/notification-list" element={<NotificationList/>}/>

        <Route path="/role-list" element={<RoleList/>}/>
        <Route path="/permission-list" element={<PermissionList/>}/>
        <Route path="/admin-list" element={<AdminList/>}/>

    </Routes>
  )
}

export default AuthenticatedRoutes