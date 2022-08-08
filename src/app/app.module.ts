import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { EnterpriseService } from './services/enterprise.service';
import { BuildYourSegmentService } from './services/build-your-segment.service';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { AuthErrorInterceptor } from './http-interceptors/auth-error-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SheetComponent } from './sheet/sheet.component';
import { DialogComponent } from './dialog/dialog.component';
import { SheetxlComponent } from './sheetxl/sheetxl.component';

import { UpdateDatasetComponent } from './update-dataset/update-dataset.component';
import { DragDirective } from './update-dataset/dragDrop.directive';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { OverlayModule } from '@angular/cdk/overlay';

import { UploadFileService } from '../app/services/upload-file.service';
import { ChurnmodelComponent } from './churnmodel/churnmodel.component';
import { NextChurnComponent } from './next-churn/next-churn.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { PredictionsComponent } from './predictions/predictions.component';
import { BuildModelComponent } from './build-model/build-model.component';
import { PresciptionsComponent } from './presciptions/presciptions.component';
import { Globals } from '../app/services/globals';
import { AutoKnowYourDataComponent } from './auto-know-your-data/auto-know-your-data.component';

import { KnowYourDataDialogComponent } from './next-churn/know-your-data-dialog/know-your-data-dialog.component';
import { ViewReportDialogComponent } from './view-report-dialog/view-report-dialog.component';

import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { VerticalBarComponent } from './charts/vertical-bar/vertical-bar.component';
import { HorizontalBarComponent } from './charts/horizontal-bar/horizontal-bar.component';
import { ViewCarouselComponent } from './view-report-dialog/view-carousel/view-carousel.component';
import { ViewTableComponent } from './charts/view-table/view-table.component';
import { UfileNameChangeDialogComponent } from './update-dataset/ufile-name-change-dialog/ufile-name-change-dialog.component';
import { DonutChartComponent } from './charts/donut-chart/donut-chart.component';
import { TreeChartComponent } from './charts/tree-chart/tree-chart.component';
import { DivergeBarChartComponent } from './charts/diverge-bar-chart/diverge-bar-chart.component';
import { TreeMapNewComponent } from './charts/tree-map-new/tree-map-new.component';
import { BuildYourSegmentComponent } from './Segment/build-your-segment/build-your-segment.component';
import { ExplainabilityComponent } from './Segment/explainability/explainability.component';


@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		LoginPageComponent,
		FirstPageComponent,
		LoginComponent,
		SheetComponent,
		DialogComponent,
		SheetxlComponent,
		UpdateDatasetComponent,
		DragDirective,
		SideNavigationComponent,
		ChurnmodelComponent,
		NextChurnComponent,
		EditFormComponent,
		PredictionsComponent,
		BuildModelComponent,
		PresciptionsComponent,
		AutoKnowYourDataComponent,
		KnowYourDataDialogComponent,
		ViewReportDialogComponent,

		PieChartComponent,
		VerticalBarComponent,
		HorizontalBarComponent,
		ViewCarouselComponent,
		TreeChartComponent,
		ViewTableComponent,
		UfileNameChangeDialogComponent,
		DonutChartComponent,
		DivergeBarChartComponent,
		TreeMapNewComponent,
		BuildYourSegmentComponent,
		ExplainabilityComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,

		FormsModule,
		HttpClientModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,

		BrowserAnimationsModule,
		MatInputModule,
		MatButtonModule,
		MatToolbarModule,
		MatTableModule,
		MatPaginatorModule,
		MatIconModule,
		MatMenuModule,
		MatSidenavModule,
		MatListModule,
		MatGridListModule,
		A11yModule,
		ClipboardModule,
		CdkStepperModule,
		CdkTableModule,
		CdkTreeModule,
		DragDropModule,
		MatAutocompleteModule,
		MatBadgeModule,
		MatBottomSheetModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatStepperModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule,
		MatGridListModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatTreeModule,
		PortalModule,
		ScrollingModule,
		OverlayModule,
		OAuthModule.forRoot(),


		NgbModule
	],
	providers: [EnterpriseService, UploadFileService, Globals, BuildYourSegmentService,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule { }
