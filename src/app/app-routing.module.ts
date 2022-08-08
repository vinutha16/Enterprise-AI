import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
import { LoginComponent } from './login/login.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { UpdateDatasetComponent } from './update-dataset/update-dataset.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SheetComponent } from './sheet/sheet.component';
import { SheetxlComponent } from './sheetxl/sheetxl.component';
import { NextChurnComponent } from './next-churn/next-churn.component'
import { ChurnmodelComponent } from './churnmodel/churnmodel.component'
import { AutoKnowYourDataComponent } from './auto-know-your-data/auto-know-your-data.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { VerticalBarComponent } from './charts/vertical-bar/vertical-bar.component';
import { HorizontalBarComponent } from './charts/horizontal-bar/horizontal-bar.component';
import { DonutChartComponent } from './charts/donut-chart/donut-chart.component';
import { TreeChartComponent } from './charts/tree-chart/tree-chart.component';
import { DivergeBarChartComponent } from './charts/diverge-bar-chart/diverge-bar-chart.component';
import { BuildYourSegmentComponent } from './Segment/build-your-segment/build-your-segment.component';



const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: "dashboard", component: FirstPageComponent, canActivate: [AuthenticationGuard] },
	{ path: 'churn', component: ChurnmodelComponent, canActivate: [AuthenticationGuard] }
	//{ path: 'sidenav', component: SideNavigationComponent },
	//{ path: 'visual', component: NextChurnComponent },

	//{ path: 'churn', component: ChurnmodelComponent },
	// {
	// 	path: 'upload',
	// 	component: UpdateDatasetComponent,
	// },
	// {
	// 	path: 'test',
	// 	component: PieChartComponent,
	// }

];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
